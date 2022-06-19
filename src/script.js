function currentDate(date) {
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let eachDay = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[eachDay];
	return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
	console.log(response);
	let temperatureType = document.querySelector("#temperature");
	let cityType = document.querySelector("#display-city");
	let descriptionType = document.querySelector("#description");
	let humidityType = document.querySelector("#humidity");
	let windType = document.querySelector("#wind");
	let iconType = document.querySelector("#icon");

	temperatureType.innerHTML = Math.round(response.data.main.temp);
	cityType.innerHTML = response.data.name;
	descriptionType.innerHTML = response.data.weather[0].description;
	humidityType.innerHTML = response.data.main.humidity;
	windType.innerHTML = Math.round(response.data.wind.speed);
	iconType.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconType.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
	let apiKey = "769668820f2d4467990d718542c608e8";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemperature);
}

function searchEngine(event) {
	event.preventDefault();
	let city = document.querySelector("#search-location").value;
	searchCity(city);
}

function searchLocation(position) {
	let apiKey = "769668820f2d4467990d718542c608e8";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function currentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateType = document.querySelector("#date");
let currentTime = new Date();
dateType.innerHTML = currentDate(currentTime);

let searchForm = document.querySelector("#find-city");
searchForm.addEventListener("submit", searchEngine);

searchCity("Clearwater");
