//Query selectors

const tiles = document.querySelectorAll(".board__tile");
const newGame = document.querySelector(".reset__button");
const body = document.querySelector("body");
const notification = document.querySelector(".notification");
const playAgain = document.querySelector(".play-again");
const closePopup = document.querySelector("#close-popup");
const message = document.querySelector(".message");

//set counters

let openTiles = [];
let goesTaken = 0;
let matchedPairs = 0;

// sleep function

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// set popup message depending how many goes have been taken to complete game

const renderFinalScreen = (goesTaken) => {
  switch (true) {
    case goesTaken < 10:
      return `Congratulations! You finished the game in ${goesTaken} goes!`;
    case goesTaken < 14:
      return `Good effort! You finished the game in ${goesTaken} goes!`;
    case goesTaken >= 14:
      return `You finished the game in ${goesTaken} goes! Better luck next time.`;
  }
};

// unmatched function: if tiles are not matched, flip them back and clear openTiles

const tilesUnmatched = async () => {
  tiles.forEach((tile) => {
    tile.style.pointerEvents = "none";
  });
  await sleep(1200);
  tiles.forEach((tile) => {
    if (tile.classList.contains("open")) {
      tile.classList.remove("open");
    }
    tile.style.pointerEvents = "";
  });
  openTiles = [];
};

// matched function: if tiles are matched, keep them open and change to green and increment matchedPairs

const tilesMatched = async () => {
  tiles.forEach((tile) => {
    tile.style.pointerEvents = "none";
  });
  await sleep(1200);
  tiles.forEach((tile) => {
    if (tile.classList.contains("open")) {
      tile.classList.remove("open");
      tile.classList.add("matched");
    }
    tile.style.pointerEvents = "";
  });
  openTiles = [];
  matchedPairs += 1;

  // if matchedPairs is 6 then end game with pop-up

  if (matchedPairs === 6) {
    message.innerHTML = renderFinalScreen(goesTaken);
    await sleep(500);
    notification.style.visibility = "visible";
  }
};

// tileFlip function

const tileFlip = (event) => {
  const currentTile = event.currentTarget;

  //     flip up to two tiles and add to classlist

  if (openTiles.length < 2) {
    openTiles.push(currentTile.className);
    currentTile.classList.add("open");
  }

  //     when two tiles are open, increment goesTaken and check for match

  if (openTiles.length === 2) {
    goesTaken += 1;

    if (openTiles[0] !== openTiles[1]) {
      tilesUnmatched();
    } else {
      tilesMatched();
    }
  }
};

// start game function: shuffle tiles and add event listener

const startGame = () => {
  const imageNumbers = [
    "1",
    "1",
    "2",
    "2",
    "3",
    "3",
    "4",
    "4",
    "5",
    "5",
    "6",
    "6",
  ];
  for (let i = tiles.length - 1; i >= 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    tiles[i].className += ` ${imageNumbers[randomNumber]}`;
    tiles[i].childNodes[1].src = `images/${imageNumbers[randomNumber]}.svg`;
    imageNumbers.splice(randomNumber, 1);
    tiles[i].addEventListener("click", tileFlip);
  }
};

// resetgame function to clear everything and start again

const resetGame = async () => {
  tiles.forEach((tile) => {
    tile.removeEventListener("click", tileFlip);
    tile.className = "tile";
  });
  openTiles = [];
  goesTaken = 0;
  matchedPairs = 0;

  body.style.opacity = 0.5;
  await sleep(200);
  body.style.opacity = "";
  await sleep(500);
  startGame();
};

// start game when page loads

document.body.onload = startGame();

// if New Game button is clicked, start new game

newGame.addEventListener("click", () => {
  resetGame();
});

//if play again button is clicked, start new game and get rid of pop up window

playAgain.addEventListener("click", () => {
  notification.style.visibility = "hidden";
  resetGame();
});

// if close-popup x is clicked, close popup

closePopup.addEventListener("click", () => {
  notification.style.visibility = "hidden";
});
