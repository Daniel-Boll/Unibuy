var table = document.getElementById("datatables");
//var tr = document.createElement("tr");
var nome;
var descricao;
var quantidade;
var prazo;



firebase.database().ref('/solicitacao').once('value')
.then (function(snapshot){
    snapshot.forEach(function (item){
        quantidade = item.val().quantidade;
        prazo = item.val().prazo;
        pessoa_solicitante = item.val().pessoa_solicitante;
        getnome(item.val().pessoa_solicitante);
    });
});
            
function getnome(ps){
    firebase.database().ref('/pessoa').on('value', function(snapshot){
        snapshot.forEach(function (item){
            if(item.val().id == ps){
                console.log(item.val().nome);
                console.log(item.val().login);
                nome = item.val().nome;
                getsetor(item.val().setor, nome);
            }        
        });
    });   
}

function getsetor(setor, nome){
    firebase.database().ref('/setor').on('value', function(snapshot){
        snapshot.forEach(function (item){
            if(item.val().id == setor){
                console.log(item.val().id);
                descricao = item.val().descricao;
                post(descricao, nome, quantidade, prazo)

            }
        
        });
    });   

}

function post(setor, nome, quantidade, prazo){
    var tr = document.createElement("tr");

    var td = document.createElement("td");
    var setor = document.createTextNode(setor);
    td.appendChild(setor);
    tr.appendChild(td);
    table.appendChild(tr);

    var td = document.createElement("td");
    var prazo = document.createTextNode(prazo);  
    td.appendChild(prazo);
    tr.appendChild(td);
    table.appendChild(tr);

    var td = document.createElement("td");
    var quantidade = document.createTextNode(quantidade);
    td.appendChild(quantidade);
    tr.appendChild(td);
    table.appendChild(tr);
    
    var td = document.createElement("td");
    var nome = document.createTextNode(nome);
    td.appendChild(nome);
    tr.appendChild(td);
    table.appendChild(tr);

    firebase.database().ref("/solicitacao/ta").set("qweqwe");

};


            // td.push(document.createElement("td").appendChild(nome));
            // td.push(document.createElement("td").appendChild(document.createTextNode(item.val().solicitante)));
            // td.push(document.createElement("td").appendChild(document.createTextNode(item.val().prazo)));
            //console.log(td);
            // for(var i of td){
            //     tr.appendChild(i);
            // }



