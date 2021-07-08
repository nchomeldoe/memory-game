//Query selectors

const tiles = document.querySelectorAll(".tile");
const newGame = document.querySelector(".refresh-button");
const body = document.querySelector("body");
const notification = document.querySelector(".notification");
const playAgain = document.querySelector(".play-again");
const closePopup = document.querySelector("#close-popup");
const message = document.querySelector(".message");

//set counters
  let openTiles = [];
  let goesTaken = 0;
  let matchedPairs = 0;

  //if tiles are not matched, flip them back and clear openTiles
const tilesUnmatched = async () => {
    tiles.forEach((tile) => {
        tile.style.pointerEvents = "none"
        });
    await sleep(1200);
     tiles.forEach((tile) => {
         if(tile.classList.contains("open")) {
            tile.classList.remove("open");
         };
         tile.style.pointerEvents = "";
         })
        openTiles = []
    
     }

  //if tiles are matched, keep them open and change to green and increment matchedPairs
  const tilesMatched = async () => {
    tiles.forEach((tile) => {
        tile.style.pointerEvents = "none"
        });
    await sleep(1200);
     tiles.forEach((tile) => {
         if(tile.classList.contains("open")) {
            tile.classList.remove("open");
            tile.classList.add("matched");
         };
         tile.style.pointerEvents = "";
         })
        openTiles = [];
        matchedPairs += 1;

        // if matchedPairs is 6 then end game with pop-up
        if(matchedPairs === 6) {
            if(goesTaken < 9){
                message.innerHTML = `Congratulations! You finished the game in ${goesTaken} goes!`
            }
            else if(goesTaken < 13) {
                message.innerHTML = `Good effort! You finished the game in ${goesTaken} goes!`
            }
            else {
                message.innerHTML = `You finished the game in ${goesTaken} goes! Better luck next time.`
            };
            await sleep(500);
            notification.style.visibility = "visible";
        }
  }


//tileFlip function 

const tileFlip = (event) => {

    const currentTile = event.currentTarget;

    //     flip up to two tiles and add to classlist
    if(openTiles.length < 2){
        openTiles.push(currentTile.className);
        currentTile.classList.add("open");
    };

    //     when two tiles are open, increment goesTaken and check for match

    if(openTiles.length === 2){
        goesTaken += 1;

        if(openTiles[0] !== openTiles[1]){
            tilesUnmatched();
        }
        else{
            tilesMatched();
        }
        
    };
}

//start game function

const startGame = () => {

    //shuffle the tiles

    const imageCategories = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];

    for(let i = tiles.length-1; i>=0; i--) {
        const randomNumber = Math.floor(Math.random() * (i+1));
        tiles[i].className += ` ${imageCategories[randomNumber]}`;
        imageCategories.splice(randomNumber, 1);
        switch(tiles[i].className) {
            case "tile A":
                tiles[i].childNodes[1].src = "images/1.svg";
                break;
            case "tile B":
                tiles[i].childNodes[1].src = "images/2.svg";
                break;
            case "tile C":
                tiles[i].childNodes[1].src = "images/3.svg";
                break;
            case "tile D":
                tiles[i].childNodes[1].src = "images/4.svg";
                break;
            case "tile E":
                tiles[i].childNodes[1].src = "images/5.svg";
                break;
            case "tile F":
                tiles[i].childNodes[1].src = "images/6.svg";
                break;
        }
    };

    tiles.forEach((tile) => {
        tile.addEventListener("click", tileFlip);
    });
 
};

//start game when page loads

document.body.onload = startGame();


// sleep function
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




    //if New Game button is clicked, start new game
 newGame.addEventListener("click", () => {
    refreshGame();
 });


 


 // refreshgame function to clear everything and start again
 const refreshGame = async () => {
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
 }

//if play again button is clicked, start new game and get rid of pop up window
playAgain.addEventListener("click", () => {
    notification.style.visibility = "hidden";
    refreshGame();
});

// if close-popup x is clicked, close popup

closePopup.addEventListener("click", () => {
    notification.style.visibility = "hidden";
})