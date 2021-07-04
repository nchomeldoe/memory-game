//Query selectors

const tiles = document.querySelectorAll(".tile");
const newGame = document.querySelector(".refresh");



//start game when page loads

document.body.onload = startGame();


//start game function

function startGame() {
        //set counters
    let openTiles = [];
    let goesTaken = 0;
    let matchedPairs = 0;


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



    // tiles.forEach((tile) => {
    //     if(tile.classList.contains("open")) {
    //         tile.classList.remove("open");
    //      };
    //     if(tile.classList.contains("matched")) {
    //         tile.classList.remove("matched")
    //     };

    //     tile.addEventListener("click", () => {

    //         //     flip up to two tiles and add to classlist
    //         if(openTiles.length < 2){
    //             openTiles.push(tile.className);
    //             tile.classList.add("open");
    //         }
    //         console.log('openTilesLength',openTiles.length)

    //         //     when two tiles are open, increment goesTaken and check for match

    //         if(openTiles.length === 2){
    //             goesTaken += 1;
    //             console.log('goesTaken',goesTaken);

    //             if(openTiles[0] !== openTiles[1]){
    //                 tilesUnmatched();
    //             }
    //             else{
    //                 tilesMatched();
    //             }
                
    //         }
    //         console.log('openTiles',openTiles);
    //     })

    //  });

    tiles.forEach((tile) => {
        if(tile.classList.contains("open")) {
            tile.classList.remove("open");
         };
        if(tile.classList.contains("matched")) {
            tile.classList.remove("matched")
        };

        tile.addEventListener("click", tileFlip);
    });

        // => {

        //     //     flip up to two tiles and add to classlist
        //     if(openTiles.length < 2){
        //         openTiles.push(tile.className);
        //         tile.classList.add("open");
        //     }
        //     console.log('openTilesLength',openTiles.length)

        //     //     when two tiles are open, increment goesTaken and check for match

        //     if(openTiles.length === 2){
        //         goesTaken += 1;
        //         console.log('goesTaken',goesTaken);

        //         if(openTiles[0] !== openTiles[1]){
        //             tilesUnmatched();
        //         }
        //         else{
        //             tilesMatched();
        //         }
                
        //     }
        //     console.log('openTiles',openTiles);
        // })

    //  });
        
        function tileFlip(event) {

                let currentTile = event.currentTarget;

            //     flip up to two tiles and add to classlist
            if(openTiles.length < 2){
                openTiles.push(currentTile.className);
                currentTile.classList.add("open");
            };
            console.log('openTilesLength',openTiles.length);

            //     when two tiles are open, increment goesTaken and check for match

            if(openTiles.length === 2){
                goesTaken += 1;
                console.log('goesTaken',goesTaken);

                if(openTiles[0] !== openTiles[1]){
                    tilesUnmatched();
                }
                else{
                    tilesMatched();
                }
                
            };
            console.log('openTiles',openTiles);
            
        }

    

   //if tiles are not matched, flip them back and clear openTiles
   async function tilesUnmatched() {
    tiles.forEach((tile) => {
        tile.style.pointerEvents = "none"
        });
    await sleep(1500);
     tiles.forEach((tile) => {
         if(tile.classList.contains("open")) {
            tile.classList.remove("open");
         };
         tile.style.pointerEvents = "";
         })
        openTiles = []
    
     }

  //if tiles are matched, keep them open and change to green and increment matchedPairs
  async function tilesMatched() {
    tiles.forEach((tile) => {
        tile.style.pointerEvents = "none"
        });
    await sleep(1500);
     tiles.forEach((tile) => {
         if(tile.classList.contains("open")) {
            tile.classList.remove("open");
            tile.classList.add("matched");
         };
         tile.style.pointerEvents = "";
         })
        openTiles = [];
        matchedPairs += 1;
        console.log('matchedPairs',matchedPairs);
        // if matchedPairs is 6 then end game with pop-up
        if(matchedPairs === 2) {
            alert('MATCHED!!!')
        }
  }

    //if New Game button is clicked, start new game
 newGame.addEventListener("click", () => {

    console.log("start game button fired");

    tiles.forEach((tile) => {
        tile.removeEventListener("click", tileFlip);
        tile.className = "tile";
        });

    startGame();

 });
 
};



// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

