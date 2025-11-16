const apiKey = "105cdb7950d4c6ae99706b1f9b6b800d";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const iconEle = document.querySelector(".icon");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();

    const cityValue = cityNameEle.value.trim(); // FIX: .value not .Value
    if (!cityValue) return;

    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("Network response is not ok!");

        const data = await response.json();
        //console.lod(data);
        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind: ${data.wind.speed} m/s`
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataEle.querySelector(".desc").textContent = description;

        iconEle.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">`;

        weatherDataEle.querySelector(".details").innerHTML =
            details.map(detail => `<div>${detail}</div>`).join("");

    } catch (err) {
        weatherDataEle.querySelector(".temp").textContent = "";
        iconEle.innerHTML = "";
        weatherDataEle.querySelector(".desc").textContent = "An error occurred!";
    }
}
