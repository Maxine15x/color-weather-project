function currentDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.eachDay()];
	return `${day} ${hours}:${minutes}`;
}

function currrentDay(timestamp) {
	console.log(date);
	let date = new Date(timestamp * 1000);
	let day = date.eachDay();
	let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function showTemperature(response) {
	let temperature = Math.round(response.data.main.temp);
	let city = response.data.name;
	let h1 = document.querySelector("h1");
	h1.innerHTML = `${city}`;
	let h3 = document.querySelector("h3");
	h3.innerHTML = `${temperature}`;
}

function searchCity(city) {
	let apiKey = "769668820f2d4467990d718542c608e8";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemperature);
}

function searchEngine(event) {
	event.preventDefault();
	let cityLocation = document.querySelector("#search-location");
	search(cityLocation.value);
}

let searchInput = document.querySelector("#find-city");
searchInput.addEventListener("submit", searchEngine);

search("Clearwater");
