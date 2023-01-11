//Homework week4 - 1
let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let actualDate = `${currentDay} ${currentHours}:${currentMinutes}`;
  return actualDate;
}

let li = document.querySelector("#real-time");
li.innerHTML = formatDate(currentTime);

//Homework week4 - 2

//function searchYourCity(event) {
//event.preventDefault();
//let actualCity = document.querySelector("#actual-city");
//let cityInput = document.querySelector("#city-input");
//actualCity.innerHTML = cityInput.value;
//}

//let cityForm = document.querySelector("#city-form");
//cityForm.addEventListener("submit", searchYourCity);

// Homework week4 - 3
function convertCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature-today");
  temperature.innerHTML = "☁️-1";
}
function convertFaharenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature-today");
  temperature.innerHTML = "☁️30";
}

let celsius = document.querySelector("#cels");
celsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#fahr");
fahrenheit.addEventListener("click", convertFaharenheit);

//Homework week5

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let myCity = response.data.name;
  let ttoday = document.querySelector("#temperature-today");
  let actualCity = document.querySelector("#actual-city");
  ttoday.innerHTML = temperature;
  actualCity.innerHTML = myCity;
}

function searchYourCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showCurrentTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showPosition);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchYourCity);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);
