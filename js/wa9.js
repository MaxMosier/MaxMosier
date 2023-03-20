// Defenition of necessary word arrays. This is the only part not initially given:
const possibleNames = [
    "Willy the Goblin", 
    "Big Daddy", 
    "Father Christmas"
];
const possiblePlaces = [
    "the soup kitchen", 
    "Disneyland", 
    "the White House"
];
const possibleVerbs = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away",
];

// Default story template:
const storyLayout =
  "It was 94 fahrenheit outside, so :insertName: went for a walk. When they got to :insertPlace:, they stared in horror for a few moments, then :insertVerb:. Bob saw the whole thing, but was not surprised — :insertName: weighs 300 pounds, and it was a hot day.";
// ^^ Bob left intact as default value

const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

// Picks a random element from the array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

randomize.addEventListener("click", result);

// Function which generates a random story:
function result() {
  //First set the alterable
  let generated = storyLayout;

  // Replace the name if one is given:
  if (customName.value !== "") {
    const newName = customName.value;
    generated.replaceAll("Bob", newName);
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(300);
    const temperature = Math.round(94);
  }

  story.textContent = "";
  story.style.visibility = "visible";
}
