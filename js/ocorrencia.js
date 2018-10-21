var a=sessionStorage.getItem("solicitacao");
var solicitacao = JSON.parse(a);
var fieldset = document.getElementById('fieldset')
console.log(fieldset);
var div = fieldset.lastChild;
var inputList = div.childNodes;
var table = document.getElementById('produtos')

console.log(solicitacao[0]);
function getNomeProduto(id){
  return new Promise((resolve, reject)=>
  {
    database.ref('/solicitacao').child(id).once("value").then(function(snapshot){
      solicitacaoSnapShot = snapshot;
      console.log(snapshot.val().descricao);
      resolve(snapshot.val().descricao);
    })
  }
);

}
for (var i in solicitacao[0].produtos){
  var produto = solicitacao[0].produtos[i]
  var tr = document.createElement('tr')
  console.log(produto);
  for (j in produto){
    var field = produto[j]
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(field));
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
console.log('fim \n');
var solicitante = document.getElementById('solicitante');
solicitante.setAttribute('placeholder', solicitacao[1]['solicitante'])
