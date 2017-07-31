// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


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

//to be called after requisite number of cards are flipped, goes through the deck and finds the flipped cards and compares them. Returns the deck with the cards marked "solved" if appropriate. Otherwise it returns them flipped back over.
function doTheyMatch(deck){

  let isMatch = true; //assume for the time being it's a match
  let currentSet = []; //this will track indices of the flipped cards

  for (let i=0;i<deck.length;i++){    //goes through the deck
    if (deck[i].hidden == false && deck[i].solved == false){ //if the current card is active but not solved...
      currentSet.push(i); //it stores the card's index. This should happen as many times as maxFlip.
    }
  }

  let symbolToMatch = deck[currentSet[0]].symbolID; // stores the first selected card's symbol

  for (let i=1;i<currentSet.length;i++){  //goes through the flipped cards
    if (deck[currentSet[i]].symbolID != symbolToMatch) {// if the current card doesn't match the first flipped card...
    isMatch = false; //then there's no match
    }
  }

  for (let i=1;i<currentSet.length;i++){
    if (isMatch){     //if they matched, mark them solved
      deck[currentSet[i]].solved = true;
    }
    else {            // otherwise flip them back over
      deck[currentSet[i]].hidden = true;
    }
  }
}


let gameSize = 6;
let gameDeck = createDeck(gameSize);

console.log("Game set")
console.log(gameDeck);


gameDeck[0].flipped = true;
gameDeck[1].flipped = true;

console.log("Flipped two cards")
console.log(gameDeck);

doTheyMatch(gameDeck);

console.log("Performed Check")
console.log(gameDeck);
