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


let gameIsRunning = true;
let youWin = false;

const maxFlip = 2; //only two cards at a time

function createDeck(numberOfCards) {      // creates a randomized card deck
  let deck = []
  // console.log(deck);
  while(numberOfCards%maxFlip != 0){  //there must be an even number of cards
    numberOfCards += 1; //keeps adding cards until there's the right amount
  }
  // console.log(numberOfCards);
  for (let i=0;i<(numberOfCards/maxFlip); i++){
    deck.push({"symbolID":i,"flipped":false,"solved":false});
    deck.push({"symbolID":i,"flipped":false,"solved":false});
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
    if (deck[i].flipped == true && deck[i].solved == false){ //if the current card is active but not solved...
      currentSet.push(i); //it stores the card's index. This should happen as many times as maxFlip.
    }
  }

  let symbolToMatch = deck[currentSet[0]].symbolID; // stores the first selected card's symbol

  for (let i=1;i<currentSet.length;i++){  //goes through the flipped cards
    if (deck[currentSet[i]].symbolID != symbolToMatch) {// if the current card doesn't match the first flipped card...
    isMatch = false; //then there's no match
    }
  }

  for (let i=0;i<currentSet.length;i++){
    if (isMatch){     //if they matched, mark them solved
      deck[currentSet[i]].solved = true;
    }
    else {            // otherwise flip them back over
      deck[currentSet[i]].flipped = false;
    }
  }
}

// STARTS GAME //

  let currentFlippedCards = 0;
  let gameSize = 6;
  let gameDeck = createDeck(gameSize);

  let boardList = document.getElementById("board-list");

  for (let i=0;i<gameDeck.length;i++){
    let li = document.createElement("li");
    let liText = document.createElement("h1");
    let liTextContent = document.createTextNode(gameDeck[i].symbolID);

    li.addEventListener('click', clickFunction);
    li.cardIndex = i;
    li.flipped = "no";
    li.solved = "no";

    liText.appendChild(liTextContent);
    li.appendChild(liText);
    boardList.appendChild(li);
  }


function clickFunction() {
  console.log("Click!!",);
  console.log(this.cardIndex);
  console.log("Was solved?",this.solved)
  console.log("Was flipped?",this.flipped)
  if (gameDeck[this.cardIndex].flipped == false){
    gameDeck[this.cardIndex].flipped = true;
    currentFlippedCards += 1;
  }

  refresh();

  console.log("Is solved?",this.solved)
  console.log("Is flipped?",this.flipped)

}


function refresh() {

  for (let i=0;i<gameDeck.length;i++){

    let backEndCard = gameDeck[i];
    let frontEndCard = document.getElementsByTagName("li")[i];

    frontEndCard.flipped = backEndCard.flipped ? 'yes' : 'no';
    frontEndCard.solved = backEndCard.solved ? 'yes' : 'no';

  }


}
