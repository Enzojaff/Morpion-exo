const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "O";
const PLAYER_O = "X";
let scorePlayer = 0
let scoreBot = 0
let turn = PLAYER_O;
let yourName = ""
let choice = ""


const boardState = Array(tiles.length);
boardState.fill(null);


playerChoice = document.getElementById("choice")
const you = document.getElementById("you")
const bot = document.getElementById("bot")
const tabScore = document.querySelector("#tabScore")
const h1 = document.querySelector("h1")
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);
const board = document.querySelector("#board")
const flex = document.querySelector(".flex")
const playerName = document.getElementById("name");
const invisible = document.getElementById("invisible")

const playGame = () => {
  invisible.style.display = "none"
  yourName = playerName.value.toUpperCase()
  choice = you.innerText
  flex.style.display = "none"
  tabScore.style.display = "block"
  board.style.display = "grid"
  if (yourName.length > 5 && yourName.length < 9) {
    h1.style.fontSize = "2.5em"
    h1.style.marginTop = "90px"
  }else if (yourName.length > 8) {
    h1.style.fontSize = "2.3em"
    h1.style.marginTop = "93px"
  }
    
}

const choosePlayer = () => {
  if (playerName.value.length === 0) {
    playerName.placeholder = "you didn't give a name"
  }else{
    playGame()

  }
}
const playerYou = () => {
  choosePlayer()
  
}

const playerBot = () => {
  choosePlayer()
  turnBot()
}

you.addEventListener("click",playerYou)
bot.addEventListener("click",playerBot)

function randomNumber(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}


tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function turnBot() {

  if (gameOverArea.classList.contains("visible")) {
    return;
  }

    let random = randomNumber(0,8)
    while (tiles[random].innerText !== "") {
      random = randomNumber(0,8)
    }
    const tileNumber = random
    tiles[random].innerText = PLAYER_O;
    boardState[tileNumber ] = PLAYER_O;
    turn = PLAYER_X;
}


function tileClick(event) {

  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText !== "") {
    if (yourName !== "LUCA") {
      return;
    }
    
  }

 
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
    
    checkWinner();
    turnBot()
    checkWinner();

    
  }
  
  const winningCombinations = [
    { combo: [1, 2, 3], strikeClass: "strike-row-1" },
    { combo: [4, 5, 6], strikeClass: "strike-row-2" },
    { combo: [7, 8, 9], strikeClass: "strike-row-3" },
    { combo: [1, 4, 7], strikeClass: "strike-column-1" },
    { combo: [2, 5, 8], strikeClass: "strike-column-2" },
    { combo: [3, 6, 9], strikeClass: "strike-column-3" },
    { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
    { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
  ];
  function checkWinner() {
    for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      
      strike.classList.add(strikeClass);
      if (tileValue1 === "X") {
        gameOverScreen(playerName.value);
        scorePlayer += 0.5
      }else {
        gameOverScreen("COMPUTER");
        scoreBot += 1
      }
      h1.innerText = `${yourName} : ${scorePlayer} | bot : ${scoreBot}`
      
      return;
    }
  }

  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `WINNER IS ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNewGame() {
  board.style.display = "none"
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
  flex.style.display = "block"
  
}

