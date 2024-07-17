// Armazena o numero secreto para que ele possa ser imprimido em algum lugar
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

//Função utilizada para resumir a forma que manipulamos cada texto do HTML
function exibeTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibeTextoNaTela('h1', 'Jogo do número secreto');
    exibeTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    //Verifica os chutes e exibe texto na tela de acordo com erro/acerto
    if(chute == numeroSecreto){
        exibeTextoNaTela('h1', 'ACERTOU!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`; 
        exibeTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto){
        exibeTextoNaTela('p', 'O número secreto é menor');
    } else {
        exibeTextoNaTela ('p','O número secreto é maior');
    } 
    tentativas++;
    limparCampo();
}

//Gera e retorna um numero aleatório entre 1 e 10 e faz com que os numeros sorteados nunca se repitam até que todos os números sejam sorteados
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

//Limpa o campo, caso você erre 1 tentativa
function limparCampo(){
    chute = document.querySelector('input');
    chute.value ='';
}

//Ativa o botão "Novo jogo" fazendo com que o jogo reinicie com a tela do começo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}