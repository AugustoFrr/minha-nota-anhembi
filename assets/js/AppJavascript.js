var janela = document.createElement('div');
var space = document.createElement('br');
var botaoSalvar = document.createElement('ion-text');
var texto = document.createElement('ion-text');
var botaoFechar = document.createElement('ion-text');
var formComponent = null;



function convertTen(inputBox) {

    if (document.getElementById("n" + inputBox).value == "1.0") {
        document.getElementById("n" + inputBox).value = "10";
    }
}

function calcular(aba) {

    if (aba == 0) {

        if (document.getElementById("n1").value == "" || document.getElementById("n2").value == "" || document.getElementById("n3").value == "") {

            formComponent.presentToast('Preencha todos os campos corretamente!');

        } else {

            var n1 = Number(document.getElementById("n1").value.replace(",", "."));
            var n2 = Number(document.getElementById("n2").value.replace(",", "."));
            var n3 = Number(document.getElementById("n3").value.replace(",", "."));

            var n1Total = Number(Math.ceil(((n1 + n2 + n3) / 3) + 'e1') + 'e-1');
            var notaN2 = Number(Math.ceil(((5 - (n1Total * 0.4)) / 0.6) + 'e1') + 'e-1');

            limpar(1);

            alertar(n1Total, notaN2);

        }
    } else {

        var n1 = Number(document.getElementById("n4").value.replace(",", "."));
        var n2 = Number(document.getElementById("n5").value.replace(",", "."));

        var final = (n1 * 0.4) + (n2 * 0.6);
        limpar(2);

        alertar(final, 0);
    }
}

function limpar(campo) {
    if (campo == 1) {
        document.getElementById("n1").value = "";
        document.getElementById("n2").value = "";
        document.getElementById("n3").value = "";
    } else {
        document.getElementById("n4").value = "";
        document.getElementById("n5").value = "";
    }
}

function closeKeyboardOnGo(event) {
    if (event.keyCode == "13") {
        Keyboard.hide();
    }
}

function alertar(nota1, nota2) {

    if (document.getElementById("janelaId")) {
        document.getElementById("janelaId").remove();
    }

    janela = document.createElement('div');
    space = document.createElement('br');
    botaoSalvar = document.createElement('ion-text');
    botaoFechar = document.createElement('ion-text');

    texto = document.createElement('ion-text');
    var texto2 = document.createElement('ion-text');

    janela.className = 'alerta';

    texto.className = 'mensagem';
    texto2.className = 'mensagem2';

    if (nota2 != 0) {
        texto.textContent = "Sua média N1 é: " + (nota1 + "").substring(0, 3);
        texto2.textContent = "Você precisa tirar " + (nota2 + "").substring(0, 3) + " na N2!";
        janela.appendChild(texto);
        janela.appendChild(space);
        janela.appendChild(texto2);
    } else {
        texto.textContent = "Sua nota final é: " + (nota1 + '').substring(0, 4) + "!";
        if (nota1 < 5) {
            texto2.textContent = "Reprovado(a)!"
            texto2.className = 'mensagem3';

        } else {
            texto2.textContent = "Aprovado(a)!"
            texto2.className = 'mensagem4';
        }
        janela.appendChild(texto);
        janela.appendChild(space);
        janela.appendChild(texto2);
    }

    botaoSalvar.className = 'botaoSalvar';
    botaoFechar.className = 'botaoFechar';

    botaoFechar.textContent = "FECHAR"
    botaoSalvar.textContent = "SALVAR"

    botaoFechar.shape = "round";
    botaoSalvar.shape = "round";

    botaoFechar.color = "none";
    botaoSalvar.color = "none";

    janela.id = "janelaId";


    if (nota2 != 0) janela.appendChild(botaoSalvar);

    janela.appendChild(botaoFechar);

    document.getElementById("bodyId").appendChild(janela);

    botaoFechar.addEventListener("click", function () {
        document.getElementById("janelaId").remove();
    });

    botaoSalvar.addEventListener("click", function () {
        document.getElementById("janelaId").remove();
        alertaSalvar(nota2);
    });
}

function alertaSalvar(valor) {
    janela = document.createElement('div');
    space = document.createElement('br');
    botaoSalvar = document.createElement('ion-text');
    texto = document.createElement('ion-text');
    botaoFechar = document.createElement('ion-text');

    var nomeDisciplina = document.createElement('ion-input');

    nomeDisciplina.type = "text";
    nomeDisciplina.className = 'inputSalvar';
    nomeDisciplina.id = "disciplinaId";
    nomeDisciplina.autocorrect = "on";
    nomeDisciplina.spellcheck = "true";
    nomeDisciplina.maxlength = "40";

    janela.className = 'alerta';
    janela.id = "janelaId";

    texto.className = 'mensagem';
    texto.textContent = "Insira o nome da disciplina:";

    botaoFechar.className = 'botaoFechar';
    botaoFechar.textContent = "FECHAR"
    botaoFechar.shape = "round";
    botaoFechar.color = "none";

    botaoSalvar.className = 'botaoSalvar';
    botaoSalvar.textContent = "SALVAR"
    botaoSalvar.shape = "round";
    botaoSalvar.color = "none";

    janela.appendChild(texto);
    janela.appendChild(space);
    janela.appendChild(nomeDisciplina);

    janela.appendChild(botaoSalvar);
    janela.appendChild(botaoFechar);
    document.getElementById("bodyId").appendChild(janela);

    botaoFechar.addEventListener("click", function () {
        document.getElementById("janelaId").remove();
    });

    botaoSalvar.addEventListener("click", function () {
        var nomeDis = document.getElementById("disciplinaId").value;

        var textoParametro = nomeDis + ": " + valor;

        formComponent.salvarNota(textoParametro);

        document.getElementById("janelaId").remove();

    });
}

function limparSalvas() {
    formComponent.limparAll();
}

function callTs() {
    formComponent.selectNota();
}

function exibirNota(valor) {

    document.getElementById("salvasId").innerHTML = "";

    var deviceHeight = formComponent.getHeight();

    

    document.getElementById("salvasId").style.height = ''+ (deviceHeight * 0.45)+ 'px';

    var msg = document.createElement('ion-text');
    msg.className = 'textoSalva';

    if (valor.length >= 1) {

        document.getElementById("salvasId").className = 'salvasClass';

        var botao = document.createElement('ion-button');

        msg.textContent = "Notas que você precisa:";

        botao.className = 'botaoLimpar';
        botao.textContent = "Excluir Todas"
        botao.id = "botaoLimparId";
        botao.color = "none";
        botao.shape = "round";
        botao.onclick = function () {
            document.getElementById("salvasId").innerHTML = "";
            msg.textContent = "Notas deletadas!"
            document.getElementById("salvasId").appendChild(msg);
            formComponent.abas = "n2";
            formComponent.limparAll();
            this.remove();
        }

        document.getElementById("salvasId").appendChild(msg);
        

        valor.forEach(function (element) {

            var container = document.createElement('div');
            var texto = document.createElement('ion-text');
            var icon = document.createElement('ion-icon');

            container.id = "containerId";

            container.className = 'containerSalva';
            texto.className = 'textoSalva';
            icon.name = 'close';
            icon.className = 'iconApagar';
            texto.textContent = element.texto;

            container.appendChild(texto);
            container.appendChild(icon);

            icon.addEventListener('click', function () {

                formComponent.remover(element.chave);
                container.remove();

                if (!document.getElementById("containerId")) {

                    formComponent.limparAll();
                    msg.textContent = "Não há notas salvas!";
                    document.getElementById("salvasId").appendChild(msg);
                    botao.remove();
                }
            });

            document.getElementById("salvasId").appendChild(container);
        });

        if(document.getElementById("botaoLimparId")){
            document.getElementById("botaoLimparId").remove();
            document.getElementById("botaoSalvaId").appendChild(botao);
        } else {
            document.getElementById("botaoSalvaId").appendChild(botao);
        }
        
    }
}