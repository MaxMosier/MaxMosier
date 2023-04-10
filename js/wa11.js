// Gridpoints:
const lat = 149;
const long = 92;

// Weather.gov API endpoint for getting the forecast
const url = `https://api.weather.gov/gridpoints/GJT/${lat},${long}/forecast`;

// Get the forecast data from the API
function refreshWeatherInfo() {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data); // Was using this for debugging. Don't need it right now, but am keeping it!
			console.log("Weather data refreshing...");

			// Extract the data! It's stored as "periods"
			const forecast = data.properties.periods;

			// Get the div elements to update
			const daysAbove = Array.from(
				document.querySelectorAll(".upper-day-zone")
			);
			const daysBelow = Array.from(
				document.querySelectorAll(".lower-day-zone")
			);
			const dayNames = Array.from(document.querySelectorAll(".day-name"));

			// Update each day element with the forecast data
			for (let i = 1; i <= daysAbove.length * 2; i += 2) {
				const dayIndex = Math.ceil(i / 2) - 1;

				const upperData = forecast[i];
				const highTemp = upperData.temperature;
				daysAbove[dayIndex].textContent = `High: ${highTemp}°F`;

				const lowerData = forecast[i + 1];
				const lowTemp = lowerData.temperature;
				daysBelow[dayIndex].textContent = `Low: ${lowTemp}°F`;

				const dayOfWeek = upperData.name;
				dayNames[dayIndex].textContent = dayOfWeek;
			}

			console.log("Weather data refreshed!");
		})
		.catch((error) => console.error(error));
}

refreshWeatherInfo();

const refreshButton = document.getElementById("refresher");
refreshButton.addEventListener("click", refreshWeatherInfo);
