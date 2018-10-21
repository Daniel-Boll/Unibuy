var datalist = document.getElementById('produtos')
console.log('a');
cod_solicitacao = "2";

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
function solicitar(){
    var solicitante = 1;
    var prazo = document.getElementById("prazo").value;
    var quantidade = document.getElementById("quantidade").value;
    var observacao = document.getElementById("obs").value;
    inserir(solicitante, prazo, quantidade, observacao)
};
function inserir(solicitante, prazo, quantidade, observacao){
    dados = {
        pessoa_solicitante: solicitante,
        quantidade: quantidade,
        prazo: prazo,
        setor: 1,
        observacao: observacao

    }
    return firebase.database().ref("/solicitacao/"+cod_solicitacao).set(dados);

}