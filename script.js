//getting DOM elements
const searchForm = document.querySelector("#search-form")
const cityName = document.querySelector("#city-name")
const preSearchBtn = document.querySelector("#search")
const currentWeatherUl = document.querySelector("#forecastNow #currentDetails")
const preSearchContainer = document.querySelector("#preSearch")
const fiveDayConatainer =document.querySelector("#fivedayForecast")
const fivedayHeader = document.querySelector("#fiveDay")
const currentWeatherH3 = document.querySelector("#forecastNow h3")

//storing API key
var APIKey = "dc33b13c1b1dacc4cd49e870ce1ff700";

const getWeather=(city)=>{
    const apiUrlCoords = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dc33b13c1b1dacc4cd49e870ce1ff700";
    fetch(apiUrlCoords)
    .then(function (response){
        return response.json()
        .then(function(data){
            const cityName = data.name
             // Creates URL for oneCall OpenWeather API from latitude and longitude of previous OpenWeather call
             const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=dc33b13c1b1dacc4cd49e870ce1ff700`;
            //fecth to retrieve daily weather info
            fetch(oneCallUrl)
            .then(function(response){
                return response,json()
                .then(function(data){
                    const icon = ("<img src='https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Weather icon'>")
                    currentWeatherH3.innerHTML = cityName + " (" + new Date(Date.now()).toLocaleDateString + ") " + icon;
                })

            })
        })
    }
}
 