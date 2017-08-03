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

function waitXSeconds(x){
  setTimeout(function(){return true;},x*1000);
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
let gameSize = 6; //cards in the game
let maxFlip = 2; //how many cards you need to match
let turnDelay = 2 //how long before mis-matched cards hide again (in seconds)
let lives = 6; //number of mistakes you can make

let currentFlippedCards = [];
let gameDeck = createDeck(gameSize);  //instantiate deck
let boardList = document.getElementById("board-list");

let waitForPlayer = false; // this stops player from clicking when they shouldn't

buildBoard(gameSize,maxFlip,turnDelay,lives);

function buildBoard(gameSize,maxFlip,turnDelay,lives){  //make it instantiate based on parameters

  for (let i=0;i<gameDeck.length;i++){
    let li = document.createElement("li");
    // let liText = document.createElement("h1");
    // let liTextContent = document.createTextNode(gameDeck[i].symbolID);
    let liImage = document.createElement("img");

    liImage.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[i].symbolID])+".ico");
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

    waitForPlayer = true;
  }
}

function clickFunction(){
// If the player clicks at an appropriate time it will flip a hidden card.
// It will then flip pending cards, put a hold on further moves, and invoke the
//   expansive "refresh" function
  if (waitForPlayer == true && gameDeck[this.cardIndex].status == "hidden"){
    gameDeck[this.cardIndex].status = "flipped";
    currentFlippedCards.push(this.cardIndex);
    waitForPlayer = false;
    flipEm();
    refresh();
  }
}

function deductHealth(){

}

function playerWins(){

}

function playerLoses(){

}

function refresh(
//Deals with the player's last move, performing animations and preparing the
//board for the player's next move

//if the player hasn't flipped a full hand, go back to waiting
  if (currentFlippedCards.length < maxFlip){
    waitForPlayer = true;
    return;
  }

//Otherwise, it will evaluate whether or not it was a match, then wait a few seconds before the next step...
  else{
    if (isAMatch(currentFlippedCards)){
      markCardsSolved(currentFlippedCards);
    }
    else if (isAMatch(currentFlippedCards)){
      markCardsHidden(currentFlippedCards);
    }

  }

  //Wait a few seconds before updating the deck
  waitXSeconds(timeDelay);

  //update the board
  flipEm();

  //wait another half second before handing control off to the player
  waitXSeconds(.5);
  waitForPlayer = true;
}

function flipEm() {
  //goes through and any board cards that don't match the gameDeck get flipped,
  //thus matching the virtual and visual decks

  //cycles through the decks...
  for (let i=0;i<gameDeck.length;i++){
    let backEndCard = gameDeck[i];
    let frontEndCard = document.getElementsByTagName("li")[i];

    // if they don't match, see what kind of spin they should do
    if (frontEndCard.status != backEndCard.status){

      if (backEndCard.status == "hidden"){
        spinForAgin(frontEndCard);
      }
      else if (backEndCard.status == "solved") {
        spinCuzYouWin(frontEndCard);
      }
      else if (backEndCard.status == "flipped"){
        spinToSee(frontEndCard);
      }
    }
  }
}

function spinCuzYouWin(card){
    let degrees = 0;
    let id = setInterval(frame,10);
    function frame() {
      if (degrees >= 90){
        clearInterval(id);
        return;
      }
      else{
        degrees++;
        card.style.transform = "rotateY("+degrees+"deg)"
        card.style.transform = "rotateX("+degrees+"deg)"
    }
  }
}

function spinForAgin(card){
  let degrees = 180;
  let id = setInterval(frame,10);
  function frame() {
    if (degrees == 90){
      card.setAttribute("src","img/logo.png");
    }
    if (degrees <= 0){
      clearInterval(id);
      return;
    }
    else{
      degrees--;
      card.style.transform = "rotateY("+degrees+"deg)"
    }
  }
}

function spinToSee(card){
  let degrees = 0;
  let id = setInterval(frame,10);
  function frame() {
    if (degrees == 90){
      card.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[i].symbolID])+".ico");
    }
    if (degrees >= 180){
      clearInterval(id);
      return;
    }
    else{
      degrees++;
      card.style.transform = "rotateY("+degrees+"deg)"
    }
  }
}


// function refresh() {
//
//   for (let i=0;i<gameDeck.length;i++){
//
//     let backEndCard = gameDeck[i];
//     let frontEndCard = document.getElementsByTagName("li")[i];
//
//     frontEndCard.status = backEndCard.status;
//     frontEndCard.setAttribute("class",frontEndCard.status);
//
//     if (frontEndCard.status == "solved") {
//       frontEndCard.lastChild.setAttribute("src","img/493 Arceus Water.ico");
//       // console.log("solved card here");
//       // console.log(frontEndCard);
//     }
//
//     if (frontEndCard.status == "hidden") {
//       frontEndCard.lastChild.setAttribute("src","img/logo.png");
//     }
//
//     if (frontEndCard.status == "flipped") {
//       frontEndCard.lastChild.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[i].symbolID])+".ico");
//     }
//
//     if (currentFlippedCards.length >= maxFlip) {  // if the flipped hand reaches the limit...
//       if (isAMatch(currentFlippedCards)){         // see if the hand is a match
//         markCardsSolved(currentFlippedCards);     // if so, solve them
//       }
//       else {
//         markCardsHidden(currentFlippedCards);     //
//       }
//       currentFlippedCards = [];
//     }
//
//   }
//
// }



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
//
// function clickFunction() {   /// old version
//   // console.log("Before Click");
//   // console.log("Current hand:",currentFlippedCards);
//   // console.log("Index Property:",this.cardIndex);
  // console.log("Id Attribute:",this.getAttribute("id"));
  // console.log("Status Property",this.status);
  // console.log("Class attribute",this.getAttribute("class"));
  //
  // console.log("Click!!",);
  // console.log("After click:",);
  //
  // if (gameDeck[this.cardIndex].status == "hidden"){
  //   gameDeck[this.cardIndex].status = "flipped";
  //   currentFlippedCards.push(this.cardIndex);
  // }
  // console.log("After click, before refresh:");
  // console.log("Current hand:",currentFlippedCards);
  // console.log("Index Property:",this.cardIndex);
  // console.log("Id Attribute:",this.getAttribute("id"));
  // console.log("Status Property",this.status);
  // console.log("Class attribute",this.getAttribute("class"));

  // refresh();
  //
  // console.log("After refresh");
  // console.log("Current hand:",currentFlippedCards);
  // console.log("Index Property:",this.cardIndex);
  // console.log("Id Attribute:",this.getAttribute("id"));
  // console.log("Status Property",this.status);
  // console.log("Class attribute",this.getAttribute("class"));

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
