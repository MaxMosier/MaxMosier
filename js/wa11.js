// Gridpoints:
const lat = 149;
const long = 92;

// Weather.gov API endpoint for getting the forecast
const url = `https://api.weather.gov/gridpoints/GJT/${lat},${long}/forecast`;

// Get the forecast data from the API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data); // Was using this for debugging. Don't need it right now, but am keeping it!

        // Extract the data! It's stored as "periods"
        const forecast = data.properties.periods;

        // Get the div elements to update
        const daysAbove = Array.from(document.querySelectorAll(".upper-day-zone"));
        const daysBelow = Array.from(document.querySelectorAll(".lower-day-zone"));

        // Update each day element with the forecast data
        for (let i = 1; i <= days.length*2; i += 2) {

            const dayIndex = Math.ceil(i/2);

            const upperData = forecast[i];
            const highTemp = upperData.temperature;
            daysAbove[n].textContent = `High: ${highTemp}°F`;

            const lowerData = forecast[i+1];
            const lowTemp = lowerData.temperature;
            daysBelow[n].textContent = `Low: ${lowTemp}°F`;

            const dayOfWeek = upperData.name;
        }
    })
    .catch((error) => console.error(error));