const cardsArray = ['❤️', '⭐', '☀️', '🌙', '🌸', '☁️'];

const grid = document.querySelector('.grid');
const message = document.getElementById('message');
let chosenCards = [];
let chosenIndexes = [];
let matchedPairs = 0;

// Function to shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create and display cards
function createCards() {
    const shuffledCards = shuffle(cardsArray.concat(cardsArray));
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.innerHTML = '<span class="hidden">' + card + '</span>';
        cardElement.addEventListener('click', handleCardClick);
        grid.appendChild(cardElement);
    });
}

// Function to handle card click
function handleCardClick() {
    if (chosenCards.length < 2 && !chosenIndexes.includes(this.dataset.index)) {
        chosenCards.push(this);
        chosenIndexes.push(this.dataset.index);
        this.classList.add('selected');
        this.firstChild.classList.remove('hidden');

        if (chosenCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Function to check if chosen cards match
function checkMatch() {
    const [card1, card2] = chosenCards;

    if (card1.firstChild.textContent === card2.firstChild.textContent) {
        card1.removeEventListener('click', handleCardClick);
        card2.removeEventListener('click', handleCardClick);
        matchedPairs++;

        if (matchedPairs === cardsArray.length) {
            message.classList.remove('hidden');
        }
    } else {
        card1.classList.remove('selected');
        card2.classList.remove('selected');
        card1.firstChild.classList.add('hidden');
        card2.firstChild.classList.add('hidden');
    }

    chosenCards = [];
    chosenIndexes = [];
}

createCards();
