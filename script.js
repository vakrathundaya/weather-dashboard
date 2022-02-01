//getting DOM elements
const searchForm = document.querySelector("#search-form")
const cityName = document.querySelector("#city-name")
const preSearchBtn = document.querySelector("#search")
const currentWeatherUl = document.querySelector("#forecastNow #currentDetails")
const preSearchContainer = document.querySelector("#preSearch")
const fiveDayConatainer =document.querySelector("#fivedayForecast")
const fivedayHeader = document.querySelector("#fiveDay")

//storing API key
var APIKey = "dc33b13c1b1dacc4cd49e870ce1ff700";

const getWeather=(city)=>{
    const apiUrlCoords = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dc33b13c1b1dacc4cd49e870ce1ff700";
    fetch(apiUrlCoords)
    .then(function (response){
        return response.json()
        .then(function(data){
            
        })
    }
}
 