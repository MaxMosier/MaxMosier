// Global variables
let clickTimestamps = [];
const timeLimitMS = 10000;

const tapButton = document.getElementById("tapButton");
const volumeDisplay = document.getElementById("volumeDisplay");
const audioPlayer = document.getElementById("audioPlayer");

// Was using this for previous version of code. Might need it later, and figure it's harmless to keep around:
function remap(originVal, inputMin, inputMax, outputMin, outputMax, clamp = true) {
	let outputVal = originVal;
    //Clamp if needed, and do so before remapping, for simplicity:
	if (clamp) {
		if (originVal > inputMax) {
			outputVal = inputMax;
		}
		if (originVal < inputMin) {
			outputVal = inputMin;
		}
	}
	return (
		((outputVal - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin);
}

// Get clicks and add their timestamps to the list:
tapButton.addEventListener("click", () => {
	const currentTimestamp = performance.now();
	recordClick(currentTimestamp);
});

// Adds the timestaps to the list:
function recordClick(currentTimestamp) {
	clickTimestamps.push(currentTimestamp);
}

// Volume functions

function updateVolume() {
    // Get current time:
	const currentTimestamp = performance.now();
    // If difference between a timestamp and current time is greater than threshold, remove it:
	clickTimestamps = clickTimestamps.filter( (timestamp) => currentTimestamp - timestamp <= timeLimitMS);
    // And update click counter
	const clickCount = clickTimestamps.length;
	const volume = Math.min(100, clickCount); // 1 click adds 1 percent: So you need 10 clicks/second just to stop the bar

    // Set volume
	setVolumeTo(volume);
	requestAnimationFrame(updateVolume);
}

function setVolumeTo(volume) {
    // Audio needs a decimal:
	audioPlayer.volume = volume / 100.0;
	volumeDisplay.textContent = volume;
	updateVolumeBar(volume);
}

function updateVolumeBar(volume) {
	const volumeBar = document.getElementById("volumeBar");
	volumeBar.style.height = volume + "%";
}

// Start the updateVolume loop
requestAnimationFrame(updateVolume);
