//For some reason, I couldn't find a way to link this... I'll put it right in the HTML for now...

const colorButton = document.querySelector("#color-button");
const colors = ["red","orange","yellow","green","blue","purple"];
let colorIndex = 0;

function gotoNextColor() {
    colorButton.style.backgroundColor = colors[colorIndex];
    colorButton.style.borderWidth = (colorIndex-3)%colors.length; //Peaks in the middle
    colorIndex = (colorIndex + 1) % colors.length; //Loops through the colors.
}

colorButton.addEventListener("click", gotoNextColor);