//Query selectors

const tiles = document.querySelectorAll(".tile");
console.dir(tiles);

const svg1 = document.querySelector("#svg-1");
console.dir(svg1);

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

}