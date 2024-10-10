document.getElementById("search-button").addEventListener("click", function() {
    const cityName = document.getElementById("city-input").value.trim();
    if (cityName) {
        getWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

function getWeather(city) {
    const apiKey = '6d617768de4ca201977000310aa1f124';  // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert("City not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data: ", error);
            alert("Failed to retrieve weather data.");
        });
}

function displayWeather(weatherData) {
    const weatherInfo = document.getElementById("weather-info");
    const city = weatherData.name;
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;

    weatherInfo.innerHTML = `
        <div class="weather-box">
            <h2>${city}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
        </div>
    `;
}
