var resultsContainer = document.querySelector("#resultsContainer")

fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c3db145bc89912e27b13b4d5a94e0f9d")
    .then(function(response) {
        console.log(response)
    }) 