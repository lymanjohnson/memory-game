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

//https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
function threeDigitNumber(num){ //returns a 3 digit number with leading zeros e.g. 7 => 007
  return ("00" + num).slice (-3);
}

let gameIsRunning = true;
let youWin = false;

function createPokemonStack(){ //this creates a randomized array containing the numbers 1-493, which will allow the cards in the memory game to refer to a fresh pokemon by their indexID
  let stack = [];
  for (i=1;i<=30;i++){  //there are 493 pokemon (NOTE:change this back to 493 later)
    stack.push(i);
  }
  shuffle(stack);
  return stack;
}

pokemonStack = createPokemonStack(); //a fresh randomized array of numers 1-493

function createDeck(numberOfCards) {      // creates a randomized card deck
  let deck = []
  // console.log(deck);
  while(numberOfCards%maxFlip != 0){  //Number of cards must be a multiple of the amount you need to match in a hand
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
  const maxFlip = 3; //how many cards you need to match
  let currentFlippedCards = [];
  let gameSize = 21;
  let gameDeck = createDeck(gameSize);

  let boardList = document.getElementById("board-list");

  for (let i=0;i<gameDeck.length;i++){
    let li = document.createElement("li");
    // let liText = document.createElement("h1");
    // let liTextContent = document.createTextNode(gameDeck[i].symbolID);
    let liImage = document.createElement("img");

    // liImage.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[i].symbolID])+".ico");
    liImage.setAttribute("src","img/logo.jpg");
    li.setAttribute("class","hidden");
    li.setAttribute("id",("card-"+i));

        // The rest of this JS is easier to code if we give each li these hidden "cardIndex" and "status" properties, in addition to their class and id. Functionally "cardIndex" property should always correspond to the "id" attribute, and the "status" to the "class".

    li.cardIndex = i;
    li.status = "hidden";

    li.addEventListener('click', clickFunction);


    // liText.appendChild(liTextContent);
    // li.appendChild(liText);
    li.appendChild(liImage);
    boardList.appendChild(li);
  }


function refresh() {

    // this.firstChild.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[this.cardIndex].symbolID])+".ico"); //makes its image into the right pokemon

  if (currentFlippedCards.length >= maxFlip) {  // if the flipped hand reaches the limit...
    if (isAMatch(currentFlippedCards)){         // see if the hand is a match
      markCardsSolved(currentFlippedCards);     // if so, solve them
    }
    else {
      markCardsHidden(currentFlippedCards);     // otherwise, flip them back over
    }
    currentFlippedCards = [];                   // reset the flipped counter to empty
  }

  for (let i=0;i<gameDeck.length;i++){

    let backEndCard = gameDeck[i];
    let frontEndCard = document.getElementsByTagName("li")[i];

    frontEndCard.status = backEndCard.status;
    frontEndCard.setAttribute("class",frontEndCard.status);

    if (frontEndCard.status == "hidden"){
      frontEndCard.firstChild.setAttribute("src","img/logo.jpg");
    }

    else if (frontEndCard.status == "solved"){
      frontEndCard.firstChild.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[this.cardIndex].symbolID])+".ico");
      console.log("hi")
    }

    else if (frontEndCard.status == "flipped"){
      frontEndCard.firstChild.setAttribute("src","");
    }

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

  if (gameDeck[this.cardIndex].status == "hidden"){
    gameDeck[this.cardIndex].status = "flipped";
    currentFlippedCards.push(this.cardIndex);
  }

  refresh();

}

// threeDigitNumber(pokemonStack[gameDeck[this.cardIndex].symbolID])

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
