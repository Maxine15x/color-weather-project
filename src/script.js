function currentDate(timestamp) {
	let date = new Date(timestamp);

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${date.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	})}`;
}

function currentDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	return days[day];
}

function showForecast(response) {
	let forecast = response.data.daily;

	let forecastType = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
			<div class="col">
						<div class="forecast-day">${currentDay(forecastDay.dt)}</div>
						<img
							src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
							alt=""
						/>
						<div class="current-forest-temperatures">
							<span class="forecast-temperature-max"> ${Math.round(
								forecastDay.temp.max
							)}° </span>
							<span class="forecast-temperature-min"> ${Math.round(
								forecastDay.temp.min
							)}° </span>
						</div>
					</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastType.innerHTML = forecastHTML;
}

function locateForecast(coordinates) {
	let apiKey = "769668820f2d4467990d718542c608e8";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
	let temperatureType = document.querySelector("#temperature");
	let cityType = document.querySelector("#display-city");
	let descriptionType = document.querySelector("#description");
	let feelType = document.querySelector("#feels_like");
	let humidityType = document.querySelector("#humidity");
	let windType = document.querySelector("#wind");
	let iconType = document.querySelector("#icon");
	let dateType = document.querySelector("#date");

	fehrenheitTemperature = response.data.main.temp;

	temperatureType.innerHTML = Math.round(fehrenheitTemperature);
	cityType.innerHTML = response.data.name;
	descriptionType.innerHTML = response.data.weather[0].description;
	feelType.innerHTML = Math.round(response.data.main.feels_like);
	humidityType.innerHTML = response.data.main.humidity;
	windType.innerHTML = Math.round(response.data.wind.speed);
	iconType.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconType.setAttribute("alt", response.data.weather[0].description);
	dateType.innerHTML = currentDate(response.data.dt * 1000);

	locateForecast(response.data.coord);
}

function searchCity(city) {
	let apiKey = "769668820f2d4467990d718542c608e8";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemperature);
}

function searchEngine(event) {
	event.preventDefault();
	let city = document.querySelector("#search-location");
	searchCity(city.value);
}

function searchLocation(position) {
	let apiKey = "769668820f2d4467990d718542c608e8";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", searchEngine);

searchCity("Clearwater");
