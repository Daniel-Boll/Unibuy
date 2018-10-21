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

getUser().then(result=>{
    solicitacaoSnapShot.forEach(function (item){
      console.log();
      getNome(item.val().pessoa_solicitante).then(result1=>{
        getSetor(item.val().setor, nome).then(descricao=>
            {
              idSolicitacao = item.key;
              nome = result1;
              quantidade = item.val().quantidade;
              prazo = item.val().prazo;
              pessoa_solicitante = item.val().pessoa_solicitante;
              post(idSolicitacao, descricao, nome, quantidade, prazo);
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

function post(idSolicitacao, setor, nome, quantidade, prazo){
    var link = document.createElement("a");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    console.log(setor);
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
    var div = document.createElement('div');
    div.setAttribute('id','solicitacao-'+idSolicitacao)
    tr.appendChild(div);
    tr.setAttribute('onclick','solicitacaoDetalhada(this)');
    table.appendChild(tr);

};

function loadSolicitacao(id){
  return new Promise((resolve, reject)=>
    {
      database.ref('/solicitacao').child(id).once('value')
      .then(function(snapshot){
          resolve(snapshot);
        })
      });
      }

function solicitacaoDetalhada(tr){
  var div = tr.lastChild;
  loadSolicitacao(div.getAttribute('id').split('-')[1]).then(snapshot =>{
    var data = [];
    data.push(snapshot.val());
    console.log(tr.childNodes);
    data.push({
      setor: tr.childNodes[0].innerHTML,
      solicitante: tr.childNodes[3].innerHTML
    });
    sessionStorage.setItem("solicitacao", JSON.stringify(data));
    window.location.replace("./ocorrencia.html");

  })

}

//
//
//             // td.push(document.createElement("td").appendChild(nome));
//             // td.push(document.createElement("td").appendChild(document.createTextNode(item.val().solicitante)));
//             // td.push(document.createElement("td").appendChild(document.createTextNode(item.val().prazo)));
//             //console.log(td);
//             // for(var i of td){
//             //     tr.appendChild(i);
//             // }
