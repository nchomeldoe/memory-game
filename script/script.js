//Query selectors

const tiles = document.querySelectorAll(".tile");
const flippedTiles = document.querySelectorAll(".open");

//Set counters

let openTiles = [];
let goesTaken = 0;
let matchedPairs = 0;

//start game when page loads

document.body.onload = startGame();


//start game function

function startGame() {

    //shuffle the tiles

    const imageCategories = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];

    for(let i = tiles.length-1; i>=0; i--) {
        let randomNumber = Math.floor(Math.random() * (i+1));
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
        tile.addEventListener("click", () => {

            //     flip up to two tiles and add to classlist
            if(openTiles.length < 2){
                openTiles.push(tile.className);
                tile.classList.add("open");
            }
            console.log(openTiles.length)

            //     when two tiles are open, increment goesTaken and check for match
            if(openTiles.length === 2){
                goesTaken += 1;
                console.log(goesTaken);
                if(openTiles[0] !== openTiles[1]){
                    tilesUnmatched();
                }
                else{
                    tilesMatched();
                }
            }
        
            //  if open tiles len is 2 then:
                // increment goesTaken
                // check for match then
                //  either do the matched func (including incrementing matchedPairs and adding matched class to open tiles) 
                // or the unmatched func
                // clear openTiles
                //  if goes taken > [value of difficulty] then throw you lose panel
                // if matched pairs == 6 then throw you win panel
            console.log(openTiles);
        })
    });

// event listener on reset button
}

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //if tiles are not matched, flip them back and clear openTiles
 async function tilesUnmatched() {
    await sleep(1500);
     tiles.forEach((tile) => {
         if(tile.classList.contains("open")) {
            tile.classList.remove("open");
         }
         })
        openTiles = []
     }

  //if tiles are matched, keep them open and change to green and increment matchedPairs
  async function tilesMatched() {
    await sleep(1500);
     tiles.forEach((tile) => {
         if(tile.classList.contains("open")) {
            tile.classList.remove("open");
            tile.classList.add("matched");
         }
         })
        openTiles = []
     }