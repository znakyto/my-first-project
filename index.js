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
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let date = now.getDate();
let year = now.getFullYear();

let month = months[now.getMonth()];
let day = days[now.getDay()];
h2.innerHTML = `${day} ${month} ${date}, ${hours}: ${minutes} ${year}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecastHTML = `
   <div class="row">
     <div class="col-2">
          <div class="weather-forecast-date">Friday</div>
                  <img
                    src="images/partialycloudy.png"
                    class="weather-pic"
                    alt="weather-picture"
                    width="100px"
                  />
                  
                  <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                  </div>
       </div>
   </div>
         `;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  console.log(response);
  let cityName = document.querySelector("#mainCitySearch");
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
  let apiKey = "017d56650cd168d68067850318775d43";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";

  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("Poprad");
displayForecast();
