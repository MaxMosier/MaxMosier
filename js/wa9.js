// Defenition of necessary string arrays. This is the only part not initially given:
const possibleNames = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const possiblePlaces = ["the soup kitchen", "Disneyland", "the White House"];
const possibleVerbs = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away",
];

// Default story template:
const storyLayout =
  "It was :insertTemp: outside, so :insertName: went for a walk. When they got to :insertPlace:, they stared in horror for a few moments, then :insertVerb:. Bob saw the whole thing, but was not surprised — :insertName: weighs :insertWeight:, and it was a hot day.";
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
  //Numerical values in story. Default lbs and Fahrenheit:
  const characterWeight = 300;
  const temp = 94;

  //First set the alterable string to the template string:
  let generated = storyLayout;

  // Replace the name if one is given:
  if (customName.value !== "") {
    const newName = customName.value;
    generated = generated.replaceAll("Bob", newName);
  }

  //Replace necessary numerical values:

  //Default values for debugging:
  let weightString = "ERROR";
  let tempString = "ERROR";

  //Convert units if needed:
  if (document.getElementById("uk").checked) {
    weightString = `${Math.round(characterWeight / 14)} stone`;
    tempString = `${Math.round((5 * (temp - 32)) / 9)} centigrade`;
  } else {
    weightString = `${characterWeight}`;
    tempString = `${temp} fahrenheight`;
  }

  generated = generated.replaceAll(":insertWeight:", weightString);
  generated = generated.replaceAll(":insertTemp:", tempString);

  //Finally, add randomized components:

  generated = generated.replaceAll(
    ":insertName:",
    randomValueFromArray(possibleNames)
  );
  generated = generated.replaceAll(
    ":insertPlace:",
    randomValueFromArray(possiblePlaces)
  );
  generated = generated.replaceAll(
    ":insertVerb:",
    randomValueFromArray(possibleVerbs)
  );

  //Set content to newly generated story and reveal:
  story.textContent = generated;
  story.style.visibility = "visible";
}
