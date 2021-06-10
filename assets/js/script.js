var searchColumn = document.querySelector("#leftColumn")
var resultsContainer = document.querySelector("#resultsContainer");
var searchInput = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn"); 

var fetchWeather = function(lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=c3db145bc89912e27b13b4d5a94e0f9d`)
    .then(function(response) {
        response.json().then(function(data){
            console.log(data);
            displayWeather(data);
        })
    }) 
    
}


var fetchCoor = function (city) {
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c3db145bc89912e27b13b4d5a94e0f9d`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        fetchWeather(data[0].lat, data[0].lon)
        
    })
}


var searchCity = function() {
    resultsContainer.innerHTML = "";

    var userSearch = searchInput.value;
    fetchCoor(userSearch);

    var userCity = document.createElement("h3");
    userCity.textContent = userSearch; 
    userCity.className = "user-city"

    var cityBox= document.createElement("div");
    cityBox.className = "city-box";

    cityBox.append(userCity); 
    leftColumn.append(cityBox); 

}

var displayWeather = function(data) {
    var weather = document.createElement("h3");
    weather.textContent=  "'s Weather: " + data.current.temp + "°F";
    weather.class = "weather-display";
    resultsContainer.append(weather); 
}

searchBtn.addEventListener("click", searchCity)