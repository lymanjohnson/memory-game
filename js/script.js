const maxFlip = 2; //only two cards at a time

function createDeck(numberOfCards) {      // creates a randomized card deck
  let deck = []
  // console.log(deck);
  if (numberOfCards%2 != 0){  //there must be an even number of cards
    numberOfCards += 1;
  }
  // console.log(numberOfCards);
  for (let i=0;i<(numberOfCards/2); i++){
    deck.push({"symbolID":i,"hidden":true,"solved":false});
    deck.push({"symbolID":i,"hidden":true,"solved":false});
    // console.log(i);
    // console.log(deck);
  }
  shuffle(deck);
  return deck;
}

isAMatch(deck){  //to be called after requisite number of cards are flipped, goes through the deck and finds the flipped cards and compares them. Returns the deck with the cards marked "solved" if appropriate. Otherwise it returns them flipped back over.
  let currentPair = [];
  for (let i=0;i<deck.length;i++){    //goes through the deck
    if (deck[i].hidden == false && deck[i].solved == false){ //if the current card is active but not solved...
      currentPair.push(i); //it stores the card's index. This should happen twice.
    }
    firstCard  = deck[currentPair[0]];
    secondCard = deck[currentPair[1]];

    if (firstCard.symbol == secondCard.symbol){  //if the symbols are the same, mark them solved
      firstCard.solved  = true;
      secondCard.solved = true;
    }
    else { //Otherwise, flip them back over
      firstCard.hidden  = false;
      secondCard.hidden = false;
    }
  }
}


let gameSize = 20;
let gameDeck = createDeck(gameSize);
console.log(gameDeck);
