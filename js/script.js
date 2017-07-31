const maxFlip = 2; //only two cards at a time

function createDeck(numberOfCards) {      // creates a randomized card deck
  let deck = []
  // console.log(deck);
  while(numberOfCards%maxFlip != 0){  //there must be an even number of cards
    numberOfCards += 1; //keeps adding cards until there's the right amount
  }
  // console.log(numberOfCards);
  for (let i=0;i<(numberOfCards/maxFlip); i++){
    deck.push({"symbolID":i,"hidden":true,"solved":false});
    deck.push({"symbolID":i,"hidden":true,"solved":false});
    // console.log(i);
    // console.log(deck);
  }
  shuffle(deck);
  return deck;
}

doTheyMatch(deck){  //to be called after requisite number of cards are flipped, goes through the deck and finds the flipped cards and compares them. Returns the deck with the cards marked "solved" if appropriate. Otherwise it returns them flipped back over.
  let isMatch = true; //assume for the time being it's a match
  let currentSet = [];
  for (let i=0;i<deck.length;i++){    //goes through the deck
    if (deck[i].hidden == false && deck[i].solved == false){ //if the current card is active but not solved...
      currentSet.push(i); //it stores the card's index. This should happen as many times as maxFlip.
    }

    let symbolToMatch = deck[currentSet[0]].symbolID; // stores the first selected card's symbol

    for (let i=1;i<currentSet.length;i++){  //goes through the flipped cards
      if (deck[currentSet[i]].symbolID != symbolToMatch) {// if the current card doesn't match the first flipped card
      isMatch = false;
      }
    }
  }


}


let gameSize = 20;
let gameDeck = createDeck(gameSize);
console.log(gameDeck);
