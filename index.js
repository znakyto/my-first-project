let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let now = new Date();
let h2 = document.querySelector("h2");

let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();
let year = now.getFullYear();

let month = months[now.getMonth()];
let day = days[now.getDay()];
h2.innerHTML = `${day} ${month} ${date}, ${hours}: ${minutes} ${year}`;

let apiKey = "017d56650cd168d68067850318775d43";

function showTemperature(response) {
  console.log(response);
  let cityName = document.querySelector("#maincitySearch");
  cityName.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let mainTemperature = document.querySelector("#temperature");
  mainTemperature.innerHTML = Math.round(celsiusTemperature);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let city = input.value;
  maincitySearch.innerHTML = `${city}`;

  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector(".searchcity");
form.addEventListener("submit", search);
function showCurrent() {
  function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl2 =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";
    axios.get(apiUrl2).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}
let current = document.querySelector("#current");
current.addEventListener("click", showCurrent);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#temperature");

  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let mainTemperature = document.querySelector("#temperature");
  mainTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(".searchcity");
form.addEventListener("submit", search);

let fahrenheitTemp = document.querySelector("#fahrenheitTemp");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemp = document.querySelector("#celsiusTemp");
celsiusTemp.addEventListener("click", displayCelsiusTemperature);
