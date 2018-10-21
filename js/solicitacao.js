var datalist = document.getElementById('produtosDatalist')
console.log('a');
cod_solicitacao = "2";
var inputList = document.getElementById('produtos');

firebase.database().ref('/produto').on('value', function(snapshot){
    datalist.innerHTML = '';
    snapshot.forEach(function (item){
    var option = document.createElement('option');
    option.setAttribute('value', item.val().descricao);
    //option.setAttribute('id', item.val().id)
    option.appendChild(document.createTextNode(item.val().id));
    datalist.appendChild(option);
    });
});

//addButton.addEventListener('solicitar',function(){
//var produtoid = document.getElementById("produtos");
//firebase.database().ref('/produto'+item.val().id).on('value', function(snapshot){
//});

 getProductId = function(){
  list = inputList.getAttribute('list');
  var options = document.querySelectorAll('#' + list + ' option');
  for(var option of options){
    if(option.getAttribute('value')==inputList.value){
      return option.childNodes[0].nodeValue;
    }
  }
  //console.log(selectedValue);
}

function solicitar(){
    var id = getProductId();
    var solicitante = 1;

    var prazo = document.getElementById("prazo").value;
    var quantidade = document.getElementById("quantidade").value;
    var observacao = document.getElementById("obs").value;
    console.log(id);
    inserir(id, solicitante, prazo, quantidade, observacao)
};
function inserir(id, solicitante, prazo, quantidade, observacao){
    dados = {
        id: id,
        pessoa_solicitante: solicitante,
        quantidade: quantidade,
        prazo: prazo,
        setor: 1,
        observacao: observacao

    }
    return firebase.database().ref("/solicitacao/"+cod_solicitacao).set(dados);

}
