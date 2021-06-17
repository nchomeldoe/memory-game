const tilesFront = document.querySelectorAll(".tile-front");
const tilesBack = document.querySelectorAll(".tile-back");
const images = document.querySelectorAll(".img");


tilesFront.forEach((tileFront) => {
    tileFront.addEventListener("click", () => {
        tileFront.parentNode.style.transform = "rotateY(180deg)";
    })
})


tilesBack.forEach((tileBack) => {
    tileBack.addEventListener("click", () => {
        tileBack.style.transform = "rotateY(180deg)";
    })
})

// images.forEach((image) => {
//     image.addEventListener("click", () => {
//         image.parentNode.style.transform = "rotateY(180deg)";
//     })
// })