var datalist = document.getElementById('produtosDatalist');
console.log('a');
var cod_solicitacao;
var inputList = document.getElementById('produtos');


firebase.database().ref('/cod_solicitacao').on('value', function(snapshot){
    snapshot.forEach(function (item){
        cod_solicitacao = item.val() + 1;
    });
});

firebase.database().ref('/produto').on('value', function(snapshot){
    datalist.innerHTML = '';
    snapshot.forEach(function (item){
      var option = document.createElement('option');
      option.setAttribute('value', item.val().descricao);
      option.setAttribute('id', item.val().id)
      option.appendChild(document.createTextNode(item.val().id));
      datalist.appendChild(option);
    });
});

// addButton.addEventListener('solicitar',function(){
// var produtoid = document.getElementById("produtos");
// firebase.database().ref('/produto'+item.val().id).on('value', function(snapshot){
// });
// });

 getProductId = function(){
  list = inputList.getAttribute('list');
  var options = document.querySelectorAll('#' + list + ' option');
  for(var option of options){
    if(option.getAttribute('value')==inputList.value){
      return option.childNodes[0].nodeValue;
    }
  }
}


var checkLimit = function(prazo, id){
  console.log(prazo);
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
  var date = new Date();
  var d1 = new Date(prazo);
  var inputItem = document.getElementById(id);
  var li = inputItem.parentNode.parentNode;
  var observacao = document.getElementById('observacao');
  if(d1.getTime() <  date.addDays(7)){
    observacao.setAttribute('required', ' ');
    if(li.lastChild.tagName!='DIV'){

      var div = document.createElement('div');
      div.appendChild(document.createTextNode('Prazo fora do limite mínimo. Justifique.'));
      div.setAttribute('class','col-md-11 bg-danger');
      li.appendChild(div);
    }
  }else {
    console.log(li.lastChild);
    if(li.lastChild.tagName=='DIV'){
      li.removeChild(li.lastChild);
      observacao.removeAttribute('required');
    }
  }
}

var excludeItem = function(id){
  var button = document.getElementById(id);
  console.log(button.parentNode);
  var li = button.parentNode;
  itemList.removeChild(li);
}

var idItem = 0;
var addItem = function(){
  console.log('fui chamado');
  var itm = itemList.lastChild;
  var cln = itm.cloneNode(true);

  if(cln.lastChild.tagName!='BUTTON'){
    var button = document.createElement('button');
    button.setAttribute('class', 'btn btn-sm btn-danger');
    button.setAttribute('style', 'width:4vh;height:4vh;border-radius:80%;color');
    button.setAttribute('form','none');
    button.setAttribute('id','button'+idItem);
    button.setAttribute('onclick','excludeItem(id)');
    cln.appendChild(button);
    console.log('id','button'+idItem);
    idItem+=1;
  }else {
    var button = cln.lastChild;
    button.setAttribute('id','button'+idItem);
    button.setAttribute('onclick','excludeItem(id)');
    console.log('id','button'+idItem);
    idItem+=1;
  }
  itemList.appendChild(cln);

}

function solicitar(){
    var id = getProductId();
    var solicitante = 1;
    var prazo = document.getElementById('prazo1').value;
    var quantidade = document.getElementById("quantidade").value;
    var observacao = document.getElementById("observacao").value;
    console.log(id);
    inserir(id, solicitante, prazo, quantidade, observacao);
    window.location.replace("./solicitacao.html");
}

function inserir(id, solicitante, prazo, quantidade, observacao){
    dados = {
        idproduto: id,
        pessoa_solicitante: solicitante,
        quantidade: quantidade,
        prazo: prazo,
        setor: 1,
        observacao: observacao
    };
    jooj = {
        cod_solicitacao: cod_solicitacao
    };
    firebase.database().ref("/cod_solicitacao").set(jooj);
    return firebase.database().ref("/solicitacao/"+cod_solicitacao).set(dados);
}
