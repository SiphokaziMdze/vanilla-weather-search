function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time")
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-app-icon");
    

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"/>`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    //console.log(response.data);
}

function formatDate(date){

    let hours = date.getHours();
    let minutes = date.getMinutes();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if(minutes < 10){
        minutes = `0${minutes}`;
    }

    return `${day}, ${hours}:${minutes}`;

}

function searchCity(city){
    //make api call and update the interface

    let apiKey = "3dbb06edc97cfaf3a6b46o9fd603t8e7";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
    console.log(apiURL);
    axios.get(apiURL).then(updateWeather);
}


function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cape Town");