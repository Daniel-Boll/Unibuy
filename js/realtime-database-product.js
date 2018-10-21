var descricaoInput = document.getElementById("descricaoInput");
var unidade_medidaInput = document.getElementById("unidade_medidaInput");
var grupo_produtoInput = document.getElementById("grupo_produtoInput");
var marcaInput = document.getElementById("marcaInput");
var cod_produto = "70033900-1";

var addButton = document.getElementById("addButton");
var usersList = document.getElementById("usersList");


console.log(addButton);
addButton.addEventListener('click',function(){
  console.log(descricaoInput.value);
  console.log(unidade_medidaInput.value);
  console.log(grupo_produtoInput.value);
  console.log(marcaInput.value);
  fist(descricaoInput.value, unidade_medidaInput.value);
  segond(grupo_produtoInput.value);
  third(marcaInput.value);
});

function fist(descricao, unidade_medida){
  var data = {
    descricao: descricao,
    unidade_medida: unidade_medida,
  };
  console.log(data);
  return firebase.database().ref("/produto/"+cod_produto+"/").set(data);
  console.log('sucesso');
}
function segond(grupo_produto){
  var data = {
    grupo_produto: grupo_produto
  };
  console.log(data);
  return firebase.database().ref("/produto/"+cod_produto+"/grupo_produto/1/").set(data);
  console.log('sucesso');
}

function third(marca){
  var data = {
    marca: marca
  };
  console.log(data);
  return firebase.database().ref("/produto/"+cod_produto+"/marca/1/").set(data);
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
