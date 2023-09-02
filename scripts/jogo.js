const frm = document.querySelector("form"); // cria referência aos elementos html
const respPalavra = document.querySelector("#outPalavra");
const respErros = document.querySelector("#outErros");
const respDica = document.querySelector("#outDica");
const respChances = document.querySelector("#outChances");
const respMensagemFinal = document.querySelector("#outMensagemFinal");
const imgStatus = document.querySelector("img");

let palavraSorteada; // declara variáveis Globais
let dicaSorteada;

window.addEventListener("load", () => {
    //se não há palavras cadastradas
    if (!localStorage.getItem("jogoPalavra")) {
        alert("Cadastre palavras para jogar!");
        frm.inLetra.disabled = true; // desabilita inLetra e botões
        frm.btJogar.disabled = true;
        frm.btVerDica.disabled = true;
    }

    //obtém conteúdo do local storage e separa em elementos de vetor
    const palavras = localStorage.getItem("jogoPalavra").split(";");
    const dicas = localStorage.getItem("jogoDica").split(";");

    const tam = palavras.length; //número de palavras cadatradas

    //gera um número aleatório entre 0 e tam -1 (pois arredonda para baixo)
    const numAleatorio = Math.floor(Math.random() * tam);

    //obtém a palavra em letras maiúsculas  e dica, na posição do nº aleatório gerado
    palavraSorteada = palavras[numAleatorio].toLocaleUpperCase();
    dicaSorteada = dicas[numAleatorio];
    let novaPalavra = ""; //para montar palavra exibida(com letra inicial e "_")

    // for para exibir a letra inicial e as demais ocorrencias desta letra na palavra
    for (const letra of palavraSorteada) {
        //se igual a letra inicial, acrescenta essa letra na exibição
        if (letra == palavraSorteada.charAt(0)) {
            novaPalavra += palavraSorteada.charAt(0);
        } else {
            novaPalavra += "_" //
        };

    };

    respPalavra.innerText = novaPalavra; // exibe nova palavra
});

frm.btVerDica.addEventListener("click", () => {
    //verifica se o jofador já clicou anteriormente no botão
    if (respErros.innerText.includes("*")) {
        alert("Você já solicitou a dica...");
        frm.inLetra.focus();
        return;
    }

    respDica.innerText = " * " + dicaSorteada; // exibe dica
    respErros.innerText += "*"; //acrescenta * nos erros;

    const chances = Number(respChances.innerText) - 1; //Diminui 1 em chances
    respChances.innerText = chances; //Mostra o número de chances
    trocarStatus(chances); // troca a imagem
    verificarFim();//verifica se atingiu limite de chances
    frm.inLetra.focus(); //Joga o foco em inLetra 
});

frm.addEventListener("submit", e => {
    e.preventDefault(); // evita envio do form
    const letra = frm.inLetra.value.toLocaleUpperCase(); //obtém o conteúdo do campo letra

    let erros = respErros.innerText; //obtém o conteúdo dos elementos da página
    let palavra = respPalavra.innerText;

    // verifica se a letra apostada já consta em erros ou na palavra
    if (erros.includes(letra) || palavra.includes(letra)) {
        alert("Você já apostou esta letra");
        frm.inLetra.focus();
        return;
    };

    // se letra consta em palavra sorteada
    if (palavraSorteada.includes(letra)) {
        let novaPalavra = "";

        //for para montar a palavra a ser exibida
        for (let i = 0; i < palavraSorteada.length; i++) {
            //se igual a letra apostada, acrescenta esta letra na exibição
            if (palavraSorteada.charAt(i) == letra) {
                novaPalavra += letra;
            } else {
                novaPalavra += palavra.charAt(i);//senão, acrscenta letra ou "_" existente
            }
        }

        respPalavra.innerText = novaPalavra;

    } else {
        respErros.innerText += letra; // acrescenta letra aos erros
        const chances = Number(respChances.innerText) - 1; //Diminui o número de chances
        respChances.innerText = chances; //exibe o novo Número de Chances

        trocarStatus(chances)//troca imagem;
    };

    frm.inLetra.value = "";
    frm.inLetra.focus();

    verificarFim();




});

const trocarStatus = (num) => {
    if (num > 0) imgStatus.src = `./images/status${num}.jpg`
};

const verificarFim = () => {
    const chances = Number(respChances.innerText); // obtém número de chances
    if (chances == 0) {
        respMensageFinal.className = "display-3 text-danger";
        respMensageFinal.innerText = `Ah... ${palavraSorteada}. Você Perdeu!`
        concluirJogo();
    } else if (respPalavra.innerText == palavraSorteada) {
        respMensagemFinal.className = "display-3 text-primary";
        respMensagemFinal.innerText = "Parabéns!! Você Ganhou"
        trocarStatus(4);//exibe a figura do rosto feliz
        concluirJogo();
    }
};

//Modifica o texto da dica e desabilita os botoes de jogar
const concluirJogo = () => {
    respDica.innerText = "*Clique no botão 'Iniciar Jogo' para jogar novamente"
    frm.inLetra.disabled = true;
    frm.btJogar.disabled = true;
    frm.btVerDica.disabled = true;
};