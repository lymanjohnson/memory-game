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

function createDeck(numberOfCards) {      // creates a randomized card deck
  let deck = []
  // console.log(deck);
  while(numberOfCards%maxFlip != 0){  //there must be an even number of cards
    numberOfCards += 1; //keeps adding cards until there's the right amount
  }
  // console.log(numberOfCards);
  for (let i=0;i<(numberOfCards/maxFlip); i++){
    for (let j=0;j<maxFlip;j++){
      deck.push({"symbolID":i,"status":"hidden"});
    }
  }
  shuffle(deck);
  return deck;
}

//to be called after requisite number of cards are flipped, goes through the deck and finds the flipped cards and compares them. Returns the deck with the cards marked "solved" if appropriate. Otherwise it returns them flipped back over.



// STARTS GAME //
  const maxFlip = 3; //only two cards at a time
  let currentFlippedCards = [];
  let gameSize = 21;
  let gameDeck = createDeck(gameSize);

  let boardList = document.getElementById("board-list");

  for (let i=0;i<gameDeck.length;i++){
    let li = document.createElement("li");
    let liText = document.createElement("h1");
    let liTextContent = document.createTextNode(gameDeck[i].symbolID);

    li.setAttribute("class","hidden");
    li.setAttribute("id",("card-"+i));

        // The rest of this JS is easier to code if we give each li these hidden "cardIndex" and "status" properties, in addition to their class and id. Functionally "cardIndex" property should always correspond to the "id" attribute, and the "status" to the "class".

    li.cardIndex = i;
    li.status = "hidden";

    li.addEventListener('click', clickFunction);


    liText.appendChild(liTextContent);
    li.appendChild(liText);
    boardList.appendChild(li);
  }


function refresh() {

  if (currentFlippedCards.length >= maxFlip) {  // if the flipped hand reaches the limit...
    if (isAMatch(currentFlippedCards)){         // see if the hand is a match
      markCardsSolved(currentFlippedCards);     // if so, solve them
    }
    else {
      markCardsHidden(currentFlippedCards);     //
    }
    currentFlippedCards = [];
  }

  for (let i=0;i<gameDeck.length;i++){

    let backEndCard = gameDeck[i];
    let frontEndCard = document.getElementsByTagName("li")[i];

    frontEndCard.status = backEndCard.status;
    frontEndCard.setAttribute("class",frontEndCard.status);
  }

}

function isAMatch (hand){     // hand will be an array that contains the indices of the flipped cards
  let symbolToMatch = gameDeck[hand[0]].symbolID;
  console.log("Symbol to match:",symbolToMatch);
  console.log("starting loop");
  for (i=1;i<hand.length;i++){
    let thisCardSymbol = gameDeck[hand[0]].symbolID;
    if (gameDeck[hand[i]].symbolID != symbolToMatch) {
      console.log("not a match!");
      return false;
    }
  }
  console.log("its a match!");
  return true;
}

function markCardsSolved (hand) {   // hand will be an array that contains the indices of the flipped cards
  for (let i=0;i<hand.length;i++){
    gameDeck[hand[i]].status = "solved";
  }
}

function markCardsHidden (hand) {   // hand will be an array that contains the indices of the flipped cards
  for (let i=0;i<hand.length;i++){
    gameDeck[hand[i]].status = "hidden";
  }
}

function clickFunction() {
  // console.log("Before Click");
  // console.log("Current hand:",currentFlippedCards);
  // console.log("Index Property:",this.cardIndex);
  // console.log("Id Attribute:",this.getAttribute("id"));
  // console.log("Status Property",this.status);
  // console.log("Class attribute",this.getAttribute("class"));
  //
  // console.log("Click!!",);
  // console.log("After click:",);

  if (gameDeck[this.cardIndex].status == "hidden"){
    gameDeck[this.cardIndex].status = "flipped";
    currentFlippedCards.push(this.cardIndex);
  }
  // console.log("After click, before refresh:");
  // console.log("Current hand:",currentFlippedCards);
  // console.log("Index Property:",this.cardIndex);
  // console.log("Id Attribute:",this.getAttribute("id"));
  // console.log("Status Property",this.status);
  // console.log("Class attribute",this.getAttribute("class"));

  refresh();

  console.log("After refresh");
  console.log("Current hand:",currentFlippedCards);
  console.log("Index Property:",this.cardIndex);
  console.log("Id Attribute:",this.getAttribute("id"));
  console.log("Status Property",this.status);
  console.log("Class attribute",this.getAttribute("class"));

}




// function doTheyMatch(){
//
//   let isMatch = true; //assume for the time being it's a match
//   let currentSet = []; //this will track indices of the flipped cards
//
//   for (let i=0;i<gameDeck.length;i++){    //goes through the deck
//     if (gameDeck[i].status == "flipped"){ //if the current card is active but not solved...
//       currentSet.push(i); //it stores the card's index. This should happen as many times as maxFlip.
//     }
//   }
//
//   let symbolToMatch = gameDeck[currentSet[0]].symbolID; // stores the first selected card's symbol
//
//   for (let i=1;i<currentSet.length;i++){  //goes through the flipped cards
//     if (gameDeck[currentSet[i]].symbolID != symbolToMatch) {// if the current card doesn't match the first flipped card...
//     isMatch = false; //then there's no match
//     }
//   }
//
//   for (let i=0;i<currentSet.length;i++){
//     if (isMatch){     //if they matched, mark them solved
//       gameDeck[currentSet[i]].status = "solved";
//     }
//     else {            // otherwise flip them back over
//       gameDeck[currentSet[i]].status = "hidden";
//     }
//   }
// }
