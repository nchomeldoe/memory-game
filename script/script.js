//Query selectors

const tiles = document.querySelectorAll(".tile");
const flippedTiles = document.querySelectorAll(".open");

//Set counters

const openTiles = [];
const goesTaken = 0;
const matchedPairs = 0;

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

//     flip up to two tiles and add to classlist

    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            if(openTiles.length < 2){
                openTiles.push(tile.className);
                tile.classList.add("open");
            }
            console.log(openTiles);
        })
    });


}

// flip tiles on click and increment openTiles counter

// function flipTiles() {
//     tiles.forEach((tile) => {
//         tile.addEventListener("click", () => {
//             openTiles.push(tile.className);
//             tile.classList.add("open");
//         })
//     });
// };

//stop flipping tiles when openTiles array reaches a length of 2

// function playGame() {
//     if(openTiles.length < 2){
//         flipTiles()
//     }
//     else{
//         goesTaken += 1;
//         if(openTiles[0] === openTiles[1]){
//             matchedPairs += 1;
//             flippedTiles.forEach((tile) => {
//                 tile.classList.remove("open");
//                 tile.backgroundColor = "green";
//             })
//         }
//         else {
//             flippedTiles.forEach((tile) => {
//                 tile.classList.remove("open");
//                 tile.backgroundColor = "red";
//             })
//         }
//     }
// }
