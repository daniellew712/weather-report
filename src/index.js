
let temperature = 20;
let isCelsius = true;

const increaseButton = document.getElementById('increaseTempControl');
const decreaseButton = document.getElementById('decreaseTempControl');
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const tempValue =  document.getElementById('tempValue');
const landscape = document.getElementById('landscape');
const skySelect = document.getElementById('skySelect');
const sky = document.getElementById('sky');
const currentTempButton = document.getElementById('currentTempButton');


const updateTemprature = () => {
    // const Celsius = Math.round((temperature-32)*5/9);
    let temp;
    if (isCelsius){
      tempValue.textContent = `${temperature}°C`;
    } else {
      temp = getTempInFahrenheit(temperature) 
      tempValue.textContent = `${temp}°F`;
    }
    updateColorTemp(temperature);
    updateWeatherGarden(temperature);
};
// Celsius changes color
const updateColorTemp = (temperature) => {

    tempValue.className = '';

  if (temperature >= 27) {
    tempValue.classList.add('red');
  } else if (temperature >= 21) {
    tempValue.classList.add('orange');
  } else if (temperature >= 15) {
    tempValue.classList.add('yellow');
  } else if (temperature >= 10) {
    tempValue.classList.add('green');
  } else {
    tempValue.classList.add('teal');
  }
};

const updateWeatherGarden = (temperature) => {
  if (temperature >= 27) {
    landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (temperature >= 21) {
    landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (temperature >= 15) {
    landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temperature >= 10) {
    landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else {
    landscape.textContent = "🌲🌲❄️❄️🐘❄️🌲❄️🌲";
  }
};

const updateSky = () => {
    if (skySelect.value === "Sunny"){
        sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    } else if (skySelect.value === "Cloudy"){
        sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (skySelect.value === "Rainy"){
        sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else {
        sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
};

const convertTemp = () => {
  const temperatureHeader = document.getElementById('temperatureHeader');
  if (isCelsius) { 
    convertTempButton.textContent = "Convert to °C";
    temperatureHeader.textContent = "Temperature (°F)";
  } else {
    convertTempButton.textContent = "Convert to °F";
    temperatureHeader.textContent = "Temperature (°C)";
  }
  isCelsius = !isCelsius;
  updateTemprature();
};

// Auxiliar functions: 
const getTempInFahrenheit = (temperatureC) => Math.round((temperatureC) * 9/5 + 32);

// Add here: calling APIs
currentTempButton.addEventListener('click', () => {
    axios.get('http://127.0.0.1:5000/location',{
        params: {q: cityNameInput.value}
    })
    .then ((response) => {
        const {lat, lon} = response.data[0];
        return axios.get('http://127.0.0.1:5000/weather',{
            params: {lat, lon}
        });
    })
    .then ((response_weather) => {
        // console.log(response_weather);
        const kelvinTemperature = response_weather.data.main.temp;
        // Celsius = Kelvin - 273.15
        temperature = Math.round(kelvinTemperature - 273.15);
        updateTemprature();
    })
    .catch((error) => {
        console.log(error);
    })
});


skySelect.addEventListener ('change', updateSky);
cityNameReset.addEventListener ('click', () => {
    cityNameInput.value = "Seattle";
    headerCityName.textContent = cityNameInput.value;
});
cityNameInput.addEventListener ('input', () =>{
    headerCityName.textContent = cityNameInput.value;
});

increaseButton.addEventListener ('click', () => {
    temperature += 1;
    updateTemprature();
});
decreaseButton.addEventListener('click', () => {
    temperature -= 1;
    updateTemprature();
});
updateTemprature();
updateSky();
cityNameInput.value = "Seattle";
headerCityName.textContent = cityNameInput.value;


convertTempButton.addEventListener("click", convertTemp);