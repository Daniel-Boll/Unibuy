var a=sessionStorage.getItem("solicitacao");
console.log(a);
var solicitacao = JSON.parse(a);
console.log(solicitacao);
var fieldset = document.getElementById('fieldset')
console.log(fieldset);
var div = fieldset.lastChild;
var inputList = div.childNodes;
for (d of inputList){
  var prazo = document.getElementById('prazo');
  prazo.setAttribute('placeholder',  solicitacao[0]['prazo'])
  var solicitante = document.getElementById('solicitante');
  solicitante.setAttribute('placeholder', solicitacao[1]['solicitante'])
}
