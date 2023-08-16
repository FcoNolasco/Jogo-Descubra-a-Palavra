const frm = document.querySelector("form");
const respLista = document.querySelector("pre");
const respCavalo = document.querySelector("#outCavalo");

//Nome dos cavalos participantes no páreo
const CAVALOS = ["Marujo", "Tordilho", "Belga", "Twister", "Jaade", "Lucky"];

//vetor que irá aramazenar um Objeto aposta(com nº do cavalo e valor da aposta)
const apostas = [];

frm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const cavalo = Number(frm.inCavalo.value);
    const valor = Number(frm.inValor.value);

    //adiciona ao vetor de objetos(atributos cavalo e valor);
    apostas.push({cavalo,valor});
    //variável para exibir a lista das apostas Realizasdas
     let lista = `Apostas Realizadas\n${"-".repeat(25)}\n`;

     // percorre o vetor e concatena em lista as apostas realizadas
     for (const aposta of apostas) {
        lista += `Nº${aposta.cavalo} ${obterCavalo(aposta.cavalo)}`;
        lista += ` - R$: ${aposta.valor.toFixed(2)}\n`
     }

     respLista.innerText = lista; //exibe lista de apostas

     frm.reset();
     frm.inCavalo.focus();
});

frm.inCavalo.addEventListener("blur",()=>{
    //se não preencehu o campo, limpa respCavalo e retorna
    //(não exibe mensagem de alerta, pois pode sair por um clique em ganhador)
    if(frm.inCavalo.value == "" ){
        respCavalo.innerText ="";
        return;
    };

    const numCavalo = Number(frm.inCavalo.value)// nº do cavalo convertido em number

    if(!validarCavalo(numCavalo)){
        alert("Nº do cavalo inválido");
        frm.inCavalo.focus();
        frm.inCavalo.value = "";
        return;
    };

    const nome = obterCavalo(numCavalo); // atribui retorno das funções à variáveis
    const contaNum = contarApostas(numCavalo);
    const total = totalizarApostas(numCavalo);

    //exibe o número de apostas e ototal apostado no cavalo
    respCavalo.innerText = `${nome} (Apostas: ${contaNum} - R$: ${total.toFixed(2)})`;

    
});

frm.btResumo.addEventListener("click",()=>{
    //vetor com valores zerados para cada cavalo
    const somaApostas = [0,0,0,0,0,0];

    //percorre apostas e acumula na posição do cavalo apostado (-1,  pois inicia em 0)

    for (const aposta of apostas) {
        somaApostas[aposta.cavalo-1] += aposta.valor;
    }

    //exibe o resultado
    let resposta =`Nº Cavalo............ R$ Apostado\n${"-".repeat(33)}\n`;
    CAVALOS.forEach((cavalo, i )=>{
        resposta += `${i+1} ${cavalo.padEnd(20)}`;
        resposta +=`${somaApostas[i].toFixed(2).padStart(11)}\n`;        
    });
    respLista.innerText = resposta;
});

frm.btGanhador.addEventListener("click",()=>{
    //Solicita o número do cavalo ganhador(Já converte para número)
    const ganhador = Number(prompt("Nº do Cavalo Ganhador: "));

    //para validar o preenchimento do prompt anterior
    if(isNaN(ganhador) || !validarCavalo(ganhador)){
        alert("Cavalo inválido");
        return;
    };

    //uso do método reduce para somar o valor das apostas
    const total = apostas.reduce((acumulador,aposta)=>acumulador + aposta.valor,0);

    // Concatena em resumo o resultado a ser exibido na página
    let resumo = `Resulrado Final do Páreo\n${"-".repeat(30)}\n`;

    resumo += `Nº Total de Apostas: ${apostas.length}\n`;
    resumo += `Total Geral R$: ${total.toFixed(2)}\n\n`;
    resumo += `Ganhador Nº: ${ganhador} - ${obterCavalo(ganhador)}\n`;
    resumo += `Nº de Apostas: ${contarApostas(ganhador)}\n`;
    resumo += `Total Apostado R$: ${totalizarApostas(ganhador).toFixed(2)}`;

    respLista.innerText = resumo; //exibe o resultado

    frm.btApostar.disabled = true; //desabilita os botões apostar e ganhador
    frm.btGanhador.disabled = true;
    frm.btNovo.focus(); // joga o foco no botão "Novo Páreo"
});

frm.btNovo.addEventListener("click",()=>{
    window.location.reload();
});


frm.inCavalo.addEventListener("focus",()=>{
    frm.inCavalo.value ="";
    respCavalo.innerText = "";
});

const obterCavalo = (num) =>{
    const posicao = num -1; //posição no vetor
    return CAVALOS[posicao];
}

const validarCavalo = (num) =>{
    //retorna o valor resultante da condição (true ou false)
    return num >= 1 && num <=CAVALOS.length; 
};

const contarApostas = (num) =>{
    let contador = 0;
    //percorre o vetor appstas
    for (const aposta of apostas) {
        //verifica se a aposta é no cavalo passado como parâmetro
        if(aposta.cavalo == num){
            contador ++; //conta +1 quando a aposta for no cavalo do parametro
        }
    }

    return contador; // retorna o nº de apostas no cavalo numCavalo
};

const totalizarApostas = (num) =>{
    let total = 0;
    for(const aposta of apostas) {
        if(aposta.cavalo == num){
            total += aposta.valor;//soma o valor das apostas
        }
    }

    return total; //retorna os valores apostados em um cavalo
};


