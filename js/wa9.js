// Defenition of necessary string arrays. This is the only part not initially given:

//These were the only interesting names I could think of...
const possibleNames = [
  "Aria Nightingale", 
  "Calliope Song", 
  "Rowan Hawthorne"];
const possiblePlaces = [
  "gorge", 
  "cemetery", 
  "cave"];
const possibleVerbs = [
  "leave right",
  "hide over there",
  "get out of here",
];
//Also added this one:
const possibleObjects = [
  "hidden treasure",
  "beautiful crystal deposit",
  "great beast"];

  
// Default story template:
const storyLayout =
  "The fog was thick in the pine forest, making it hard to see beyond a few feet. :insertName: shivered in the :insertTemp: degree weather, regretting not bringing a warmer coat. :userName: had insisted on coming here, to the eerie :insertPlace: where they had heard rumors of a :insertObject:. As they stumbled through the mist, they heard a rustling in the bushes. :insertName: tried to call out, but their voice was stuck in their throat. Suddenly, :userName: grabbed their arm and whispered urgently, \"We need to :insertVerb: now!\"";
// ^^ The name ":userName:" is what I've used in place of "Bob" left intact as default value

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
  const temp = 2;

  //First set the alterable string to the template string:
  let generated = storyLayout;

  // Replace the name if one is given:
  if (customName.value !== "") {
    const newName = customName.value;
    generated = generated.replaceAll(":userName:", newName);
  } else {
    generated = generated.replaceAll(":userName:", "Wilson");
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
  generated = generated.replaceAll(
    ":insertObject:",
    randomValueFromArray(possibleObjects)
  );

  //Set content to newly generated story and reveal:
  story.textContent = generated;
  story.style.visibility = "visible";
}
