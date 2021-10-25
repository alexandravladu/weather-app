
let currentTime = new Date();
console.log(currentTime);
console.log(currentTime.getMinutes());
console.log(currentTime.getHours());
console.log(currentTime.getMonth());
console.log(currentTime.getDate());
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[currentTime.getDay()];
let month = months[currentTime.getMonth()];
let year = currentTime.getFullYear();
let date = currentTime.getDate();
let sentence = `Today is ${day}, ${date},${month} ${year}, ${hours}:${minutes}`;
console.log(sentence);
let today = document.querySelector("#current-time");
today.innerHTML = `${sentence}`;

//2
function displaySearchedCity(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature} °C | °F `;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )} %`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
   let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description );
 
celsiusTemperature = response.data.main.temp;
 
}

function searchedCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = `${cityInput.value}`;
  let units = "metric";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}&appid=${apiKey}`;
 console.log(apiUrl);
 axios.get(apiUrl).then(displaySearchedCity);

}





function displayCurrentCity(response){
 console.log(response.data);
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature} °C  `;
let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )} %`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description );
}


function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentCity);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
let getCurrentCity = document.querySelector("#location");
getCurrentCity.addEventListener("click", getPosition);

let celsiusTemperature = null;

function displayFahrenheitTemperature (event){
event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let temperatureElement= document.querySelector("#current-temperature");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusLink(event){
  event.preventDefault();
  let temperatureElement= document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
 
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusLink);

let form = document.querySelector("form");
form.addEventListener("submit", searchedCity);