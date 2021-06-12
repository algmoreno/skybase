var searchColumn = document.querySelector("#leftColumn")
var resultsContainer = document.querySelector("#resultsContainer");
var searchInput = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn"); 
var resultsColumn = document.querySelector("#resultsColumn");
var userSearch; 
var dailyDiv; 

var dateEl = document.createElement("h3")
dateEl.textContent = moment().format("dddd, MMMM Do YYYY");
dateEl.className = "col-2 date-text"; 
resultsColumn.append(dateEl);

var fetchWeather = function(lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=c3db145bc89912e27b13b4d5a94e0f9d`)
    .then(function(response) {
        response.json().then(function(data){
            displayWeather(data);
            console.log(data);
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

    userSearch = searchInput.value;
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
    userSearch = searchInput.value; 

    var tempEl = document.createElement("h3");
    tempEl.textContent=  userSearch + "'s Current Temperature: " + data.current.temp + "°F";
    tempEl.className = "temp-text";
    
    var condition= data.current.weather[0].main; 

    if (condition === "Clear") {
        var sunnyEl = document.createElement("img");
        sunnyEl.setAttribute("src", "./assets/images/sun.png"); 
        sunnyEl.className = "weather-icon"; 
        resultsContainer.append(sunnyEl); 
    }

    else if (condition === "Clouds") {
        var cloudyEl = document.createElement("img");
        cloudyEl.setAttribute("src", "./assets/images/clouds2.png"); 
        cloudyEl.className = "weather-icon"; 
        resultsContainer.append(cloudyEl); 
    }

    else if (condition === "Rain") {
        var rainyEl = document.createElement("img");
        rainyEl.setAttribute("src", "./assets/images/rain.png"); 
        rainyEl.className = "weather-icon"; 
        resultsContainer.append(rainyEl); 
    }

    else if (condition === "Mist") {
        var mistyEl = document.createElement("img");
        mistyEl.setAttribute("src", "./assets/images/mist.png"); 
        mistyEl.className = "weather-icon"; 
        resultsContainer.append(mistyEl); 
    }

    var humidityEl = document.createElement("h3")
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%"; 
    humidityEl.className = "humidity-text"; 

    var windEl = document.createElement("h3");  
    windEl.textContent= "Wind Speed: " + data.current.wind_speed + " mph"
    windEl.className= "wind-text";

    var uvi = data.current.uvi;

    var uvBox = document.createElement("div");
        if (uvi < 4 || uvi === 4) {
            uvBox.className = "uv-box-fav";
        }
        else if (uvi >4 && uvi <8) {
            uvBox.className = "uv-box-mod"
        }
        else {
            uvBox.className = "uv-box-sev"
        }

    var uvEl = document.createElement("h3");
    uvEl.textContent = "UVI: " + uvi
    uvEl.className= "uvi-text"; 
    uvBox.append(uvEl); 
    
    resultsContainer.append(tempEl); 
    resultsContainer.append(humidityEl);
    resultsContainer.append(windEl); 
    resultsContainer.append(uvBox); 

    var forecastDiv = document. createElement("div");
    forecastDiv.className = "forecast-box";
    resultsContainer.append(forecastDiv);
    
    for (var i = 1; i < 6; i++) {


        if (data.daily[i].weather[0].main === "Clear") {
            dailyDiv = document.createElement("div");
            dailyDiv.className = "daily-box";

            var sunnyEl = document.createElement("img");
            sunnyEl.setAttribute("src", "./assets/images/sun.png"); 
            sunnyEl.className = "small-weather-icon"; 
            dailyDiv.append(sunnyEl); 
        }
    
        else if (data.daily[i].weather[0].main === "Clouds") {
            dailyDiv = document.createElement("div");
            dailyDiv.className = "daily-box";

            var cloudyEl = document.createElement("img");
            cloudyEl.setAttribute("src", "./assets/images/clouds2.png"); 
            cloudyEl.className = "small-weather-icon"; 
            dailyDiv.append(cloudyEl); 
        }
    
        else if (data.daily[i].weather[0].main === "Rain") {
            dailyDiv = document.createElement("div");
            dailyDiv.className = "daily-box";

            var rainyEl = document.createElement("img");
            rainyEl.setAttribute("src", "./assets/images/rain.png"); 
            rainyEl.className = "small-weather-icon"; 
            dailyDiv.append(rainyEl); 
        }
    
        else if (data.daily[i].weather[1].main === "Mist") {
            dailyDiv = document.createElement("div");
            dailyDiv.className = "daily-box";

            var mistyEl = document.createElement("img");
            mistyEl.setAttribute("src", "./assets/images/mist.png"); 
            mistyEl.className = "small-weather-icon"; 
            dailyDiv.append(mistyEl); 
        }

        var dateEl = data.daily[i].dt 
        
        var fullDate = new Date(dateEl * 1000);
        var myDay = fullDate.toLocaleString("en-US", {day: "numeric"}); 
        var myMonth = fullDate.toLocaleString("en-US", {month: "numeric"}); 
        
        var forecastDate = document.createElement("h3");
        forecastDate.textContent = myMonth + "/" + myDay; 
        forecastDate.className = "forecast-date"; 
        forecastDiv.append(forecastDate); 
        

        var highEl = document.createElement("h3");
        highEl.textContent = "High: " + data.daily[i].temp.max  + "°F";
        highEl.className = "forecast-text";
    
        var lowEl = document.createElement("h3");
        lowEl.innerHTML = "Low: " + data.daily[i].temp.min + "°F";
        lowEl.className = "forecast-text";

        var dailyWindEl= document.createElement("h3");
        dailyWindEl.textContent = "Wind Speed: " + data.daily[i].wind_speed + " mph"; 
        dailyWindEl.className = "forecast-text"; 

        var dailyHumEl= document.createElement("h3");
        dailyHumEl.textContent = "Humidity: " + data.daily[i].humidity + " %"; 
        dailyHumEl.className = "forecast-text"; 

        var dailyDivSub = document.createElement("div");
        dailyDivSub.className=("daily-sub-box");
        dailyDiv.append(dailyDivSub);

        dailyDivSub.append(highEl);
        dailyDivSub.append(lowEl); 
        dailyDivSub.append(dailyWindEl); 
        dailyDivSub.append(dailyHumEl);
        forecastDiv.append(dailyDiv); 
    }
}

searchBtn.addEventListener("click", searchCity)