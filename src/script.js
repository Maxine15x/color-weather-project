function currentDate(date) {
  let hours = date.getHours();
  if (hours < 12) {
    hours = `${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 59) {
    minutes = `${minutes}`;
  }

  let eachDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[eachDay];

  return `${day} ${hours}:${minutes}`;
}

let h2 = document.querySelector("h2");
let newTime = new Date();
h2.innerHTML = currentDate(newTime);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}`;
}

function searchEngine(event) {
  event.preventDefault();
  let apiKey = "769668820f2d4467990d718542c608e8";
  let city = document.querySelector("#search-location").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

let searchInput = document.querySelector("#find-city");
searchInput.addEventListener("submit", searchEngine);
