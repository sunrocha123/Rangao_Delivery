// exibir pratos na página produtos

$(function (){
    exibirPratos();
});

function exibirPratos() {
    $.getJSON("pratos.json", function(data){
        x = data.pratos.length;
        for(var i = 0; i < x; i++){
            $("#pratos").append("<div class = 'conteudoPratos'>" + "<p><h3>" + data.pratos[i].nomeRestaurante + "</h3></p>" + '<figure><img src="' + data.pratos[i].imagem + '" width = "250" height = "200"></figure>' + "<p class = 'informacoesPrato'>" + data.pratos[i].nomePrato + "<br><br>" + "R$ " + data.pratos[i].valor + "</p>" + "<button onclick = 'adicionarItens(" + '"' + data.pratos[i].nomePrato + '"' + "," + data.pratos[i].valor + ")'>Adicionar</button>" + "</div>");
        }
    });  
}

// Apagar itens do carrinho

$(function(){
    $('.botao').click(function(){
        apagarDados();
    });
});

// adicionar itens no carrinho

function adicionarItens(prato, valor){
    localStorage.setItem(prato, valor);
    alert('Prato: ' + prato + ' adicionado no carrinho!');
}

// função para apagar itens do carrinho

function apagarDados(){
    if (localStorage.length > 0){
        localStorage.clear();
    } 
    else {
        alert('Nenhum registro encontrado!');
    }
}

// carregar tabela com produtos/valores e o valor total a ser pago

$(function(){
    exibirTabela();
});

function exibirTabela(){
    y = localStorage.length;

    let totPagar = 0;

    for(let k = -1; k < y; k++){
        if (k ==  -1) {
            $("#tabela").append("<tr><th> Nome do Prato </th>" + "<br>" + " <th class = 'valor'>Valor</th></tr>")
        } else {
            $("#tabela").append("<tr><td class = 'linhaPrato'>" + localStorage.key(k) + "</td>" + "<br>" + "<td class = 'linhaValor'> R$ " + localStorage.getItem(localStorage.key(k)) + "</td></tr>");
            totPagar += parseFloat(localStorage.getItem(localStorage.key(k)));
        }
    }

    $("#dados").append("<p class = 'tot'><strong>Total a pagar: R$ "+ totPagar.toFixed(1) +"</strong></p>");
}

// exibir o menu na página produtos

$(function(){
    exibirMenu();
});

function exibirMenu() {
    $.ajax({
        url: "menu.xml",
        success: function (xml) {
            $(xml).find("opcao").each(function () {
                var link = '<a class = "cor" href="' + $(this).attr("link") +'">' + $(this).text() + '</a><br><br>';
                $("#menu").append(link);
            });
        },
        error: function () {
            alert("Mensagem de erro.");
        }
    });
}