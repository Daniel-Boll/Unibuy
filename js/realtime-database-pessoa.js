var loginInput = document.getElementById("loginInput");
var nomeInput = document.getElementById("nomeInput");
var saltInput = document.getElementById("saltInput");
var senhaInput = document.getElementById("senhaInput");
var tipo_pessoaInput = document.getElementById("tipo_pessoaInput");

var addButton = document.getElementById("addButton");
var usersList = document.getElementById("usersList");
var cod_pessoa;
var cod_pessoaRef;

console.log(addButton);
addButton.addEventListener('click',function(){

            
    console.log(loginInput.value);
    console.log(nomeInput.value);
    console.log(saltInput.value);
    console.log(senhaInput.value);
    console.log(tipo_pessoaInput.value);
    console.log(cod_pessoa);
    try{
        fist(loginInput.value, nomeInput.value, saltInput.value, senhaInput.value, cod_pessoa);
        segond(tipo_pessoaInput.value);
    }catch{
        console.log("Nao deu")
    }  

});

cod_pessoaRef = firebase.database().ref('/cod_pessoa');
cod_pessoaRef.on('value', function(snapshot) {
    console.log('somei!');
    cod_pessoa =  1 + snapshot.val().value;

});

function fist(login, nome, salt, senha, cod_pessoa){
  var data = {
    login: login,
    nome: nome,
    salt : salt,
    senha : senha
  };
  console.log(data);
  var jooj = {value: cod_pessoa}
  console.log(jooj)
  firebase.database().ref("/cod_pessoa").set(jooj);
  return firebase.database().ref("/pessoa/"+cod_pessoa+"/").set(data);
  console.log('sucesso');
}

function segond(tipo_pessoa){
  var data = {
    tipo_pessoa: tipo_pessoa
  };
  console.log(data);
  return firebase.database().ref("/pessoa/"+cod_pessoa+"").set(data);
  console.log('sucesso');
}


// firebase.database().ref('/produto/cod_produto/').on('value', function(snapshot){
//   usersList.innerHTML = '';
//   snapshot.forEach(function (item){
//     var li = document.createElement('li');
//     li.appendChild(document.createTextNode(item.val().name +': '+item.val().age));
//     userList.appendChild(li);
//   });

// });
