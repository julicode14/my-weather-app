function formatDate(timestamp) {
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//function convertCelsius(event) {
// event.preventDefault();
// let temperature = document.querySelector("#temperature-today");
// temperature.innerHTML = "☁️-1";
//}
//function convertFaharenheit(event) {
//event.preventDefault();
// let temperature = document.querySelector("#temperature-today");
// temperature.innerHTML = "☁️30";
//}

//let celsius = document.querySelector("#cels");
//celsius.addEventListener("click", convertCelsius);

//let fahrenheit = document.querySelector("#fahr");
//fahrenheit.addEventListener("click", convertFaharenheit);

//function showCurrentTemperat(response) {
// let temperature = Math.round(response.data.temperature.current);
// let myCity = response.data.city;
// let ttoday = document.querySelector("#temperature-today");
// let actualCity = document.querySelector("#actual-city");
// ttoday.innerHTML = temperature;
// actualCity.innerHTML = myCity;
//}
function showCurrentTemperature(response) {
  document.querySelector("#temperature-today").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#actual-city").innerHTML = response.data.city;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#real-time").innerHTML = formatDate(
    response.data.time * 1000
  );

  celsiusTemperature = response.data.temperature.current;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchYourCity(city) {
  let apiKey = "f6a6co8tc65642fe1b2e3fafd7d5d0f6";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f6a6co8tc65642fe1b2e3fafd7d5d0f6";
  let unit = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`;
  axios.get(url).then(showCurrentTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showPosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchYourCity(cityInput.value);
}
//let li = document.querySelector("#real-time");
//let currentTime = newDate();
//li.innerHTML = formatDate(currentTime);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-today");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchYourCity("Munich");
