//getting DOM elements

const searchForm = document.querySelector("#search-form");
const cityName = document.querySelector("#city-name");
const currentWeatherUl = document.querySelector("#forecastNow #conditions");
const previousSearchContainer = document.querySelector("#previous-searches .card-body");
const fiveDayWeatherContainer = document.querySelector("#fivedayForecast");
const fiveDayHeader = document.querySelector("#fiveDay");
const currentWeatherH3 = document.querySelector("#forecastNow h3");

//storing API key
var APIKey = "dc33b13c1b1dacc4cd49e870ce1ff700";

const getWeather = (city) => {
    // Creates URL for initial API call to retrieve latitude and longitude of requested city
    const apiUrlCoords = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dc33b13c1b1dacc4cd49e870ce1ff700";
    // Initial fetch to retrieve latitude and longitude
    fetch(apiUrlCoords)
        .then(function (response) {
            // if city is not found
            if (!response.ok) {
                currentWeatherUl.innerHTML = "";
            } else {
                // Converts API response into json object
                response.json()
                    .then(function (data) {
                        const cityName = data.name;
                        // Creates URL for oneCall OpenWeather API from latitude and longitude of previous OpenWeather call
                        const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=dc33b13c1b1dacc4cd49e870ce1ff700`;

                        // Fetch to retrive current daily weather info
                        fetch(oneCallUrl)
                            .then(function (response) {
                                if (response.ok) {
                                    // Converts API response into json object
                                    response.json()
                                        .then(function (data) {
                                            // icon to display current weather status
                                            const icon = ("<img src='https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Weather icon'>");

                                            currentWeatherH3.innerHTML = cityName + " (" + new Date(Date.now()).toLocaleDateString + ") " + icon;
                                            currentWeatherH3.innerHTML = cityName + " (" + moment().format("MM/DD/YYYY") + ") " + icon;

                                            const fivedayDetails = [];

                                            // Clears any existing list items from previous searches
                                            currentWeatherUl.innerHTML = "";
                                            // Creates four list items to hold current weather
                                            for (let i = 0; i < 4; i++) {
                                                const li = document.createElement("li");
                                                li.classList.add("mb-2");
                                                fivedayDetails.push(li);
                                            }
                                            // Populates contents of list items with properties of json object
                                            fivedayDetails[0].innerHTML = "Temperature: " + data.current.temp + " &deg;F";
                                            fivedayDetails[1].textContent = "Humidity: " + data.current.humidity + "%";
                                            fivedayDetails[2].textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
                                            fivedayDetails[3].innerHTML = `UV Index: <button class="btn btn-info uv">${data.current.uvi}</button>`;

                                            // Appends each updated list item to specified ul
                                            fivedayDetails.forEach(li => {
                                                currentWeatherUl.append(li);
                                            })
                                            let fiveDayWeatherConditions = [];

                                            // Clears existing cards for 5-Day Forecast container
                                            fiveDayWeatherContainer.innerHTML = "";

                                            // get info for next 5 days from daily openCall property
                                            for (let i = 0; i < 5; i++) {
                                                const dailyCard = document.createElement("div");
                                                // Populates forecast data for each card.
                                                dailyCard.innerHTML = `<div class="flex p-2 m-2 card bg-dark text-white">
                                                                            <h5>${moment().add(i + 1, "days").format("MM/DD/YYYY")}</h5>
                                                                            <ul id="conditions">
                                                                                <li><img src='https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png' alt="Weather icon"></li>
                                                                                <li>Temp: ${data.daily[i].temp.day} &deg;F</li>
                                                                                <li>Humidity: ${data.daily[i].humidity}%</li>                                                                                
                                                                            </ul>
                                                                        </div>`;
                                                // Pushes card into dailyArray to then be appended to container
                                                fiveDayWeatherConditions.push(dailyCard);
                                            }
                                            // Appends cards stored in dailyArray to container
                                            fiveDayWeatherConditions.forEach(card => {
                                                fiveDayWeatherContainer.appendChild(card);
                                            })
                                            updateLocalStorage(cityName);

                                        })
                                }
                            })
                    })
            }
        })
}



const updateSearchHistory = () => {
    // get previous searches from local storage
    previousSearch = JSON.parse(localStorage.getItem("searches"));
    const cityBtn = document.querySelectorAll("#previous-searches button");
    if (previousSearch !== null) {
        cityBtn.forEach(button => {
            // making sure searched city is not repeated
            for (let i = 0; i < previousSearch.length; i++)
                if (button.dataset.city.includes(previousSearch[i])) {
                    previousSearch.splice(i, i + 1);
                }
        })
        for (let i = 0; i < previousSearch.length; i++) {
            const searchButton = document.createElement("button");
            searchButton.classList.add("m-2", "btn", "btn-light");
            // Sets data-city attribute
            searchButton.dataset.city = previousSearch[i];
            searchButton.textContent = previousSearch[i];
            searchButton.addEventListener("click", (event) => {
                getWeather(event.target.dataset.city);
            })
            previousSearchContainer.appendChild(searchButton);
        }

    }
}

//global variable
const cityArray = [];

const updateLocalStorage = (city) => {
    // Ensures searched city isn't pushed into array (and then localStorage) if city has already been searched
    if (cityArray.includes(city)) {
        return;
    } else {
        cityArray.push(city);
        // Stores for next user visit
        localStorage.setItem("searches", JSON.stringify(cityArray));

        // Calls updateSearchHistory to add new search to previous search buttons
        updateSearchHistory();
    }
} 

// Adds event listener to search form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let searchValue = cityName.value;
    getWeather(searchValue);
   
})
