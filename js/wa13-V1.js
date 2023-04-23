// Global variables
let lastClickTimestamp = 0;
let started = false;
let timeTable = Array(15).fill(-1); // -1 will be the default value to indicate sections of the array not yet given values
let currentIndex = 0; //Adds the 
const tapButton = document.getElementById('tapButton');
const volumeDisplay = document.getElementById('volumeDisplay');
const audioPlayer = document.getElementById('audioPlayer');


// A simple mapping function:
function remap(originVal, inputMin, inputMax, outputMin, outputMax, clamp = true){
    let outputVal = originVal;
    if(clamp){
        if(originVal > inputMax){
            outputVal = inputMax;
        }
        if(originVal < inputMin){
            outputVal = inputMin; 
        }
    }
    return ( ( (outputVal - inputMin) * (outputMax - outputMin) ) / (inputMax - inputMin) ) + outputMin;
}

// Click event listener
tapButton.addEventListener('click', () => {
    const currentTimestamp = performance.now(); // Timestamp in milliseconds

    if (!started) { // If we haven't yet received the first click
        lastClickTimestamp = currentTimestamp; // Set the timestamp
        started = true; // And change 'started' to true to indicate the first click has been received and "start" the timers
        audioPlayer.play();
        return;
    }

    const newestInterval = currentTimestamp - lastClickTimestamp;
    console.log(`Newest interval: ${newestInterval}`);
    enqueueTimeDifference(currentTimestamp - lastClickTimestamp);
    lastClickTimestamp = currentTimestamp;
    updateVolume();
});

// Adds the newest time to the list of times. Order doesn't matter since we just want the average
function enqueueTimeDifference(timeDifference) {
    timeTable[currentIndex] = timeDifference;
    currentIndex++; // Move up one in the index
    currentIndex %= timeTable.length; // Restrict to the bounds of the array
}

// Volume functions
function updateVolume() {
    let sum = 0;
    let observedElements = 0;

    for (let i = 0; i < timeTable.length; i++) {
        if (timeTable[i] == -1) {
            break;
        }
        sum += timeTable[i];
        observedElements++;
    }

    const average = sum / observedElements;
    console.log(`\t Current average: ${average}`);
    let normalizedVolume = remap(average, 20, 1000, 100, 0);

    setVolumeTo(normalizedVolume);
}

function setVolumeTo(volume) {
    audioPlayer.volume = volume / 100.0;
    volumeDisplay.textContent = volume;
    updateVolumeBar(volume);
}

function updateVolumeBar(volume) {
    const volumeBar = document.getElementById('volumeBar');
    volumeBar.style.height = volume + '%';
}

