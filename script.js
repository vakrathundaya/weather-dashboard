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
                    currentWeatherH3.innerHTML = cityName + " (" + new Date(Date.now()).toLocaleDateString + ") " + icon

                    const forecastDeatils = []

                   //creating list items to hold current weather
                   for(let i=0;i<=4;i++){
                       const listItemEl = document.createElement("li")
                        forecastDeatils.push(li)
                   }

                   forecastDeatils[0].innerHTML = data.current.temp
                   forecastDeatils[1].innerHTML = data.current.humidity
                   forecastDeatils[2].innerHTML = data.current.wind_speed
                   forecastDeatils[3].innerHTML = data.current.uvi

                   //adding list items to ul
                   forecastDeatils.forEach(listItemEl => {
                       currentWeatherUl.append(listItemEl)
                   })

                   //array to hold five day details
                   fiveDayWeatherConditions = []

                   for(i=0; i<5; i++){
                       const fivedaycard = document.createElement("div")
                       fivedayDivEl.innerHTML = `<div class="card">
                       <h5>${moment().add(i + 1,"days").format("MM/DD/YYYY")}</h5>
                       <ul>
                       <li><img src='https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png' alt="Weather icon"></li>
                       <li>${data.daily[i].temp.day}</li>
                       <li>${data.daily[i].humidity}</li>
                       </div>`

                       fiveDayWeatherConditions.push(fivedaycard)
                   }

                   fiveDayWeatherConditions.forEach(element = > {
                       fiveDayWeatherContainer.appendChild(element)
                   })
                })

            })
        })
    }


}
 