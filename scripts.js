const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função para adicionar classe flipCard
function flipCard () {
    if(lockBoard) return;
    if(this === firstCard) return;//não deixa clicar duas vezes na mesma carta

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

//função para checar se as duas cartas são iguais
function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    unflipCards();
}

//função para desabilitar o flipCard caso as duas cartas sejam iguais, sendo assim permanecem viradas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//função para remover a classe flip da carta caso elas não sejam iguais, sendo assim voltam ao estado inicial, desviradas.
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

    resetBoard();
    }, 1500);
}

//função para resetar as variáveis.
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função de embaralhar as cartas - mexe no atributo order do css. Será uma  IIFE (Immediately Invoked Function Expression) para ser invocada toda vez que iniciar o jogo
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);//Math é um obj do Js de cálculos matemáticos, o .floor arredonda para numeros inteiros e .random sorteia cada vez um numero *12 (de 0 a 11)
        card.style.order = randomPosition;
    })
}) ();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})