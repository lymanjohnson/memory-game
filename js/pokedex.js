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

function threeDigitNumber(num){ //returns a 3 digit number with leading zeros e.g. 7 => 007
  return ("00" + num).slice (-3);
}

function twoDigitNumber(num){ //returns a 3 digit number with leading zeros e.g. 7 => 007
  return ("0" + num).slice (-2);
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




function createPokeDexArray(){
  let pokedexArray = [];
  for (i=1;i<=483;i++){
    let entry = new Image();
    entry.onload = function() { console.log("Height: " + this.height); }
    entry.src = "img/"+threeDigitNumber(i)+".ico";
    pokedexArray.push(entry);
  }
  return pokedexArray;
}

pokedexArray = createPokeDexArray();
console.log(pokedexArray);

function createPokeDexNodes(){
  // let pokedex = document.getElementById("pokedex");
  let pokedex = [];
  for (i=1;i<=483;i++){
    let entryContainer = document.createElement("div");
    entryContainer.style.filter= "grayscale(100%)";
    entryContainer.classList.add("entry-container");
    entryContainer.setAttribute("id","pokedex"+i);
    entryContainer.appendChild(pokedexArray[i-1]);
    pokedex.push(entryContainer);
  }
  return pokedex
}

console.log(pok);

pokedexNodesArray = createPokeDexNodes();

function createPokeDex() {
  let pokedexElement = document.getElementById("pokedex");
  for (i=0;i<pokedexNodesArray.length;i++){
    pokedexElement.appendChild(pokedex[i]);
  }
}


    // let entry = document.createElement("img");
    // entry.setAttribute("src","img/"+threeDigitNumber(i)+".ico");
