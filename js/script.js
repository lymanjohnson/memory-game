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

function createPokemonStack(){ //this creates a randomized array containing the numbers 1-493, which will allow the cards in the memory game to refer to a fresh pokemon by their indexID
  let stack = [];
  for (i=1;i<=493;i++){
    stack.push(i);
  }
  shuffle(stack);
  return stack;
}

function createDeck(numberOfCards) {      // creates a randomized card deck
  let deck = []
  while(numberOfCards%gameParameters.maxFlip != 0){  //Number of cards must be a multiple of the amount you need to match in a hand
    numberOfCards += 1; //keeps adding cards until there's the right amount
  }

  // //console.log(numberOfCards);
  for (let i=0;i<(numberOfCards/gameParameters.maxFlip); i++){
    for (let j=0;j<gameParameters.maxFlip;j++){
      deck.push({"symbolID":i+1,"status":"hidden"});
    }
  }
  shuffle(deck);
  return deck;
}

let startGameButton = document.getElementById("start-game-button");
startGameButton.addEventListener("click",buttonPressed);

let startOverButton1 = document.getElementById("startover-button-1");
startOverButton1.addEventListener("click",startOver);

let startOverButton2 = document.getElementById("startover-button-2");
startOverButton2.addEventListener("click",startOver);

//to be called after requisite number of cards are flipped, goes through the deck and finds the flipped cards and compares them. Returns the deck with the cards marked "solved" if appropriate. Otherwise it returns them flipped back over.

// STARTS GAME //

let musicMatch    = document.getElementById("sound-match");
let musicWin      = document.getElementById("sound-win");
let musicLose     = document.getElementById("sound-lose");
let musicPlaying  = document.getElementById("sound-playing");
let musicSelect   = document.getElementById("sound-select");
let soundError    = document.getElementById("sound-error");

musicWin.volume = .7;
musicLose.volume = .7;
musicSelect.volume = .6;

musicSelect.currentTime = 12.25;
musicSelect.play();

let lifeCounter  =  document.getElementById("life-counter");

let gameIsRunning = true;
let youWin = false;
let pokemonStack; //a fresh randomized array of numers 1-493
let waitForPlayer = false; // this stops player from clicking when they shouldn't

// let gameSize = 15; //cards in the game
// let maxFlip = 2; //how many cards you need to match
// let turnDelay = 2 //how long before mis-matched cards hide again (in seconds)
// let lives = 60; //number of mistakes you can make

function createGameParameters(size,flips,delay,lives){
  let parameters =
                      { "gameSize":size,
                        "maxFlip":flips,
                        "turnDelay":delay,
                        "lives":lives};
  return parameters;
}

let currentFlippedCards = [];
let boardList = document.getElementById("board-list");
let flipSpeed = 2; //speed of the flip animation. Lower = faster

let gameDeck = [];
let gameParameters;

function buttonPressed() { //will redefine the global game parameters based on player selection
  musicSelect.pause();
  musicSelect.currentTime = 12.25;
  pokemonStack = createPokemonStack(); //a fresh randomized array of numers 1-493
  newGameSize  = 4//parseInt(document.getElementById("game-size").value);
  newMaxFlip   = 2//parseInt(document.getElementById("hand-size").value);
  newTurnDelay = 2;   //[will require a lot more tweaking to make this dynamic]
  newLives     = 1; //parseInt(document.getElementById("live-count").value)*newGameSize/newMaxFlip;
    // number of mistakes is weighted by the relative game size and hand size

  // gameParameters = createGameParameters(15,2,2,60);
  gameParameters = createGameParameters(newGameSize,newMaxFlip,newTurnDelay,newLives);
  gameDeck = createDeck(newGameSize);  //instantiate deck

  buildBoard();
  musicSelect.stop();
  musicSelect.currentTime = 12.25;

}

function buildBoard(){  //make it instantiate based on parameters


  for (let i=0;i<=lives;i++){
    let lifeIcon = document.createElement.("img");
    lifeIcon.setAttribute("src","logo.png");
    lifeIcon.classList.add("life-icn");
    lifeCounter.appendChild(lifeIcon);

  }

  for (let i=0;i<gameDeck.length;i++){

    let li = document.createElement("li");
    // let liText = document.createElement("h1");
    // let liTextContent = document.createTextNode(gameDeck[i].symbolID);
    let liImage = document.createElement("img");
    let liSound = document.createElement("audio");

    // liImage.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[i].symbolID])+".ico");

    console.log(i);
    console.log(gameDeck[i]);
    console.log(gameDeck[i].symbolID);
    liSound.setAttribute("src","wav/"+threeDigitNumber(pokemonStack[gameDeck[i].symbolID])+".wav");
    liImage.setAttribute("src","img/logo.png");
    li.setAttribute("class","hidden");
    li.setAttribute("id",("card-"+i));

        // The rest of this JS is easier to code if we give each li these hidden "cardIndex" and "status" properties, in addition to their class and id. Functionally "cardIndex" property should always correspond to the "id" attribute, and the "status" to the "class".

    li.cardIndex = i;
    li.status = "hidden";

    li.addEventListener('click', clickFunction);

    // liText.appendChild(liTextContent);
    // li.appendChild(liText);
    li.appendChild(liImage);
    li.appendChild(liSound);
    boardList.appendChild(li);
  }
  waitForPlayer = true;
  document.getElementById("wrapper").classList.add("invisible");
  document.getElementById("board").classList.remove("invisible");
}

function clickFunction(){
// If the player clicks at an appropriate time it will flip a hidden card.
// It will then flip pending cards, put a hold on further moves, and invoke the
// expansive "refresh" function
  //console.log("click",currentFlippedCards);
  if (waitForPlayer == true && gameDeck[this.cardIndex].status == "hidden"){
    gameDeck[this.cardIndex].status = "flipped";
    currentFlippedCards.push(this.cardIndex);
    waitForPlayer = false;
    flipEm();
    refresh();
  }
  //console.log("clicked",currentFlippedCards);
}

function isGameOver(){
  if (gameParameters.lives<=0){
    playerLoses();
  }
  else {
    let youWon = true;
    for (i=0;i<gameDeck.length;i++){
      if (gameDeck[i].status != "solved"){youWon=false;}
    }
    if (youWon){playerWins();}
  }
}

function deductHealth(){
  gameParameters.lives -= 1/gameParameters.maxFlip;
}

function playerWins(){
  musicWin.currentTime=.5;
  musicWin.play()
  let theBoard    = document.getElementById("board");
  let winScreen  = document.getElementById("win-screen");
  theBoard.classList.add("invisible");
  winScreen.classList.remove("invisible");

}

function playerLoses(){
  musicLose.currentTime=.5;
  musicLose.play();
  let theBoard    = document.getElementById("board");
  let lossScreen  = document.getElementById("loss-screen");
  theBoard.classList.add("invisible");
  lossScreen.classList.remove("invisible");

}

function startOver(){
  let theWrapper  = document.getElementById("wrapper");
  let theBoard    = document.getElementById("board");
  let theList     = document.getElementById("board-list");
  let winScreen   = document.getElementById("win-screen");
  let lossScreen  = document.getElementById("loss-screen");

  musicLose.pause();
  musicWin.pause();
  theList.innerHTML = "";
  theBoard.classList.add("invisible");
  theWrapper.classList.remove("invisible");
  winScreen.classList.add("invisible");
  lossScreen.classList.add("invisible");
  musicSelect.currentTime = 12.25;
  musicSelect.play();


}

function refresh(){
//Deals with the player's last move, performing animations and preparing the
//board for the player's next move

//if the player hasn't flipped a full hand, go back to waiting
  if (currentFlippedCards.length < gameParameters.maxFlip){
    setTimeout( function() {
      waitForPlayer = true;
    },800);
    return;
  }

//Otherwise, it will evaluate whether or not it was a match, then wait a few seconds before the next step...
  else{
    //console.log("refresh, first else, currentFlippedCards=",currentFlippedCards);
    if (isAMatch(currentFlippedCards)){
      markCardsSolved(currentFlippedCards);
    }

    else {
      markCardsHidden(currentFlippedCards);
    }

  }

  setTimeout(function(){
    flipEm();
    setTimeout(function(){
      isGameOver();
      waitForPlayer = true;
    },750);
  },gameParameters.turnDelay*850);
}

function flipEm() {
  //goes through and any board cards that don't match the gameDeck get flipped,
  //thus matching the virtual and visual decks
  //cycles through the decks...
  for (let i=0;i<gameDeck.length;i++){
    let backEndCard = gameDeck[i];
    let frontEndCard = document.getElementsByTagName("li")[i];

    //console.log(i);
    //console.log(backEndCard);
    //console.log(frontEndCard);
    //console.log(frontEndCard.status);

    // if they don't match, see what kind of spin they should do
    if (frontEndCard.status != backEndCard.status){

      if (backEndCard.status == "hidden"){  // && currentFlippedCards.length>=gameParameters.maxFlip
        //console.log("should be hidden")
        spinForAgin(frontEndCard);
      }
      else if (backEndCard.status == "solved" ) { //&& currentFlippedCards.length>=gameParameters.maxFlip
        //console.log("should be solved")
        spinCuzYouWin(frontEndCard);
      }
      else if (backEndCard.status == "flipped"){
        //console.log("should be flipped")
        spinToSee(frontEndCard);
      }
    }
  }
}


//function to spin a card into solved state
function spinCuzYouWin(card){
    let degrees = 0;
    musicMatch.currentTime=.5;
    musicMatch.play()
    let id = setInterval(frame,flipSpeed);
    function frame() {
      if (degrees >= 90){
        clearInterval(id);
        card.setAttribute("class","solved");
        card.status = "solved";
      }
      else{
        degrees++;
        // card.style.transform = "rotateY("+degrees+"deg)";
        card.style.transform = "rotateX("+degrees+"deg)";
    }
  }
}
//function to spin a card into hidden state
function spinForAgin(card){
  deductHealth();
  let degrees = 0;
  soundError.play();
  let id = setInterval(frame,flipSpeed);
  function frame() {
    if (degrees == 90){
      card.firstChild.setAttribute("src","img/logo.png");
    }
    if (degrees >= 180){
      clearInterval(id);
      card.setAttribute("class","hidden");
      card.status = "hidden";
    }
    else{
      degrees++;
      card.style.transform = "rotateY("+degrees+"deg)";
    }
  }
}

//function to spin a card into revealed state
function spinToSee(card){
  let degrees = 180;
  let id = setInterval(frame,flipSpeed);
  function frame() {
    if (degrees == 90){
      card.firstChild.setAttribute("src","img/"+threeDigitNumber(pokemonStack[gameDeck[card.cardIndex].symbolID])+".ico");
      console.log(card);
      console.log(card.lastChild);
      card.lastChild.play();
    }
    if (degrees <= 0){
      clearInterval(id);
      card.setAttribute("class","flipped");
      card.status = "flipped";
    }
    else{
      degrees--;
      card.style.transform = "rotateY("+degrees+"deg)";
    }
  }
}

function isAMatch (hand){     // hand will be an array that contains the indices of the flipped cards
  let symbolToMatch = gameDeck[hand[0]].symbolID;
    //console.log("Symbol to match:",symbolToMatch);
    //console.log("starting loop");
  for (i=1;i<hand.length;i++){
    let thisCardSymbol = gameDeck[hand[0]].symbolID;
    if (gameDeck[hand[i]].symbolID != symbolToMatch) {
      //console.log("not a match!");
      return false;
    }
  }
  //console.log("its a match!");
  return true;
}


function markCardsSolved (hand) { // hand will be an array that contains the indices of the flipped cards
  for (let i=0;i<hand.length;i++){
    //console.log("marking solved:");
    //console.log("\thand[i]",hand[i]);
    //console.log("\tgameDeck[hand[i]]",gameDeck[hand[i]]);
    gameDeck[hand[i]].status = "solved";
  }
  currentFlippedCards = [];
}


function markCardsHidden (hand) {   // hand will be an array that contains the indices of the flipped cards
  for (let i=0;i<hand.length;i++){
    //console.log("marking wrong (to be hidden):");
    //console.log("\thand[i]",hand[i]);
    //console.log("\tgameDeck[hand[i]]",gameDeck[hand[i]]);
    gameDeck[hand[i]].status = "hidden";
  }
  currentFlippedCards = [];
}
