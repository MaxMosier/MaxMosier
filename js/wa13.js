// Global variables
let clickTimestamps = [];
const timeLimitMS = 10000;

const tapButton = document.getElementById("tapButton");
const volumeDisplay = document.getElementById("volumeDisplay");
// const audioPlayer = document.getElementById("audioPlayer"); // Old relic from MP3-using version.
let ytPlayer;

// Was using this for previous version of code. Might need it later, and figure it's harmless to keep around:
function remap(
	originVal,
	inputMin,
	inputMax,
	outputMin,
	outputMax,
	clamp = true
) {
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
		((outputVal - inputMin) * (outputMax - outputMin)) /
			(inputMax - inputMin) +
		outputMin
	);
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

let frameCount = 0;

function updateVolume() {
	// Get current time:
	const currentTimestamp = performance.now();
	// If difference between a timestamp and current time is greater than threshold, remove it:
	clickTimestamps = clickTimestamps.filter(
		(timestamp) => currentTimestamp - timestamp <= timeLimitMS
	);

	// Every other frame, remove the oldest timestamp.
	frameCount++; // Next frame!
	if (frameCount % 13 === 0 && clickTimestamps.length > 0) {
		// Check if it's an even frame and if there's any timestamp to remove in the first place
		clickTimestamps.shift(); // Remove the oldest timestamp, which will always be the first in the array.
	}

	// And update click counter
	const clickCount = clickTimestamps.length;
	const volume = Math.min(100, clickCount); // 1 click adds 1 percent: So you need 10 clicks/second just to stop the bar

	// Set volume
	setVolumeTo(volume);
	requestAnimationFrame(updateVolume);
}

// Updates the audio player and display numbers
function setVolumeTo(volume) {
	// Audio needs a decimal:
	if (ytPlayer && ytPlayer.setVolume) {
		ytPlayer.setVolume(volume);
	}
	volumeDisplay.textContent = volume;
	updateVolumeBar(volume);
}

// Changes the volume bar height.
function updateVolumeBar(volume) {
	const volumeBar = document.getElementById("volumeBar");
	volumeBar.style.height = volume + "%";
}

// SET THE YOUTUBE ID HERE
var videoId = "9Oid6F4Aox8"; // <------------------------------------------------------------- YT ID!
// Get the YouTube ID by grabbing all characters between (?v=, &)

// Make an invisuble, auto-playing, looping YouTube video:
function onYouTubeIframeAPIReady() {
	ytPlayer = new YT.Player("ytPlayer", {
		height: "0",
		width: "0",
		videoId: videoId,
		playerVars: {
			autoplay: 1, // Auto-play the video on load
			loop: 1, // Loop the video
			playlist: videoId, // Needed for looping
			controls: 0, // Hide player controls
			modestbranding: 1, // Remove YouTube branding
			fs: 0, // Disable fullscreen button
		},
		events: {
			onReady: onPlayerReady,
		},
	});
}

function onPlayerReady(event) {
	// Initialize this with no volume
	event.target.setVolume(0);
}

// Start the updateVolume loop
requestAnimationFrame(updateVolume);
