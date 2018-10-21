var table = document.getElementById("datatables");
//var tr = document.createElement("tr");
var nome;
var descricao;
var quantidade;
var prazo;

var database = firebase.database()
var solicitacaoSnapShot = "";
function getUser () {
    return new Promise((resolve, reject)=>
    {
      database.ref('/solicitacao').once("value").then(function(snapshot){
        solicitacaoSnapShot = snapshot;
        resolve();
      })
    }
  );
}

console.log(solicitacaoSnapShot);

getUser().then(result=>{
    solicitacaoSnapShot.forEach(function (item){
      getNome(item.val().pessoa_solicitante).then(result1=>{
        getSetor(item.val().setor, nome).then(descricao=>
            {
              nome = result1;
              quantidade = item.val().quantidade;
              prazo = item.val().prazo;
              pessoa_solicitante = item.val().pessoa_solicitante;
              post(descricao, nome, quantidade, prazo)
            }
        );
      });
  })
});
var ps;
function getNome(ps){
  return new Promise((resolve, reject)=>
    {

      database.ref('/pessoa').once('value')
      .then(function(snapshot){
        snapshot.forEach(function (item){
            if(item.val().id == ps){
                // console.log(item.val().nome);
                // console.log(item.val().login);
                nome = item.val().nome;
                // console.log(nome);


                resolve(nome);

            }
        });
      });
    });
  }
function getSetor(setor, nome) {
  console.log(nome);
  return new Promise((resolve, reject)=>
    {
      database.ref('/setor').once('value')
      .then(function(snapshot){
        snapshot.forEach(function (item){
            if(item.val().id == setor){
              descricao = item.val().descricao;
              console.log(item.val());
            }
        });
        resolve(descricao);
      });
    });
}


//

//
// function getsetor(setor, nome){
//     firebase.database().ref('/setor').on('value', function(snapshot){
//         snapshot.forEach(function (item){
//             if(item.val().id == setor){
//                 console.log(item.val().id);
//                 descricao = item.val().descricao;
//                 post(descricao, nome, quantidade, prazo)
////             }
//
//         });
//     });
//
// }
//

function post(setor, nome, quantidade, prazo){
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    setor = document.createTextNode(setor);
    td.appendChild(setor);
    tr.appendChild(td);
    table.appendChild(tr);

    var td = document.createElement("td");
    prazo = document.createTextNode(prazo);
    td.appendChild(prazo);
    tr.appendChild(td);
    table.appendChild(tr);

    var td = document.createElement("td");
    var exemplo = document.createTextNode('exemplo');
    td.appendChild(exemplo);
    tr.appendChild(td);
    table.appendChild(tr);

    var td = document.createElement("td");
    nome = document.createTextNode(nome);
    td.appendChild(nome);
    tr.appendChild(td);
    table.appendChild(tr);

    firebase.database().ref("/solicitacao/ta").set("qweqwe");

};
//
//
//             // td.push(document.createElement("td").appendChild(nome));
//             // td.push(document.createElement("td").appendChild(document.createTextNode(item.val().solicitante)));
//             // td.push(document.createElement("td").appendChild(document.createTextNode(item.val().prazo)));
//             //console.log(td);
//             // for(var i of td){
//             //     tr.appendChild(i);
//             // }
