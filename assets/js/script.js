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
    var userSearch = searchInput.value;
    console.log(userSearch); 
    fetchCoor(userSearch);
}

var displayWeather = function(data) {
    var weather = document.createElement("h3");
    weather.textContent="Weather:" + data.current.temp;
    resultsContainer.append(weather); 
}

searchBtn.addEventListener("click", searchCity)