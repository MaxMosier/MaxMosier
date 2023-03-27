const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames and alt texts  */

// Will have to manually set each. Might add procedural automation later
const img_fileNames = [
  "picture1.jpg",
  "picture2.jpg",
  "picture3.jpg",
  "picture4.jpg",
  "picture5.jpg",
];

// Using parallel array to link images to ALT descriptions:
const img_alts = [
  "A blocky digital painting of a futuristic city",
  "A painting of a peanut butter and jelly sandwich next to some gummy bears, crayons in a jar, and milk in a jar",
  "An illustration of a coyote done in colored pencil, with the pencils used shown as well",
  "An image of some graffiti of a coyote",
  "A painting of a dramatically lit mountain scape with orange and green trees in the foreground",
];

/* A functiom I made to help with the below loop: */

function updateDisplay() {
  displayedImage.src = this.src; // The callee will be used as the new source
  displayedImage.alt = this.alt;
}

/* Looping through images */

for (let i = 0; i < img_fileNames.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", "../img/wa10/customPics/" + img_fileNames[i]); // Asusming same path, grab current filename
  newImage.setAttribute("alt", img_alts[i]); // And corresponding alt (ASSUMING PARALLEL ARRAYS)
  thumbBar.appendChild(newImage);
  newImage.addEventListener("click", updateDisplay);
}

/* Wiring up the Darken/Lighten button */

function toggleBrightness() {
  const status = btn.getAttribute("class"); // Get whether it's "dark" or "light"
  if (status == "dark") {
    btn.setAttribute("class", "noFilter");
    btn.textContent = "Show Original";
    overlay.style.backgroundColor = "rgba(0,0,0,0.35)";
    return;
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
}
// We were shown in class to use the arrow => notation, but I just found it more readable to just make the function separate!
btn.addEventListener("click", toggleBrightness);
