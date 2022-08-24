var latitude
var longitude
var displayCityName
var currentDate
var currentTemp
var currentWindspeed
var currentHumidity
var currentUVI
var currentWeatherIcon
var cityInput

//search button function
var searchButton = $('#searchButton');
searchButton.on('click', function() {

cityInput = $('input[id="userInput"]').val();
console.log(cityInput)
    

geocodingUrl = 'https://api.geoapify.com/v1/geocode/search?text=' + cityInput + '&filter=countrycode:us&apiKey=a5d5ba0ac854494492b5801b965f9c17';

fetch(geocodingUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    latitude = (data.features[0].properties.lat);
    console.log(latitude);
    longitude = (data.features[0].properties.lon);
    console.log(longitude);
    displayCityName = cityInput;
    console.log(displayCityName);
    console.log(data)
    //display chosen city name on page
    document.getElementById("cityName").textContent = displayCityName
  });
  
  

weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.6038321&lon=-122.330062&units=imperial&appid=a3cbff459cf1aec9060b5cbeb75cb3c8';

fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    //converting given unix time to easier to read standard date and time format
    var unixDate = data.current.dt;
    var unixDate2 = moment.unix(unixDate).format("L");
    currentDate = unixDate2;
    currentTemp = data.current.temp;
    currentWindspeed = data.current.wind_speed;
    currentHumidity = data.current.humidity;
    currentUVI = data.current.uvi;
    currentWeatherIcon = data.current.weather[0].icon;

    //current date and time
    document.getElementById("currentDate").textContent = currentDate;

    //weather conditions icon
    src = 'http://openweathermap.org/img/wn/' + currentWeatherIcon + '@2x.png';
    currentWeatherImage = document.createElement('img');
    currentWeatherImage.src = src;

    document.getElementById('currentIcon').appendChild(currentWeatherImage);

    //temperaure fahrenheit
    document.getElementById('currentTemp').textContent = "Temp: " + currentTemp + " °F"

    //windspeed
    document.getElementById('currentWindspeed').textContent = "Windspeed: " + currentWindspeed + " MPH"

    //humidity
    document.getElementById('currentHumidity').textContent = "Humidity: " + currentHumidity + " %"

    //UVI
    document.getElementById('currentUVI').textContent = "UV Index: " + currentUVI

  
    console.log(data.daily)
    for (i = 0; i < 5; i++) {
        forecastDat0 = data.daily[i];
        
        //converting unix forecast into forecast date
        forecastDate = data.daily[i].dt;
        forecastDate2 = moment.unix(forecastDate).format("L");
        convertedForecastDate = forecastDate2;

        forecastTemp = data.daily[i].temp.day;
        forecastWindspeed = data.daily[i].wind_speed;
        forecastHumidity = data.daily[i].humidity;
        forecastWeatherIcon = data.daily[i].weather[0].icon;    
        
        //fetch FORECASTED weather conditions icon
        forecastimagesrc = 'http://openweathermap.org/img/wn/' + forecastWeatherIcon + '@2x.png';
        forecastWeatherImage = document.createElement('img');
        forecastWeatherImage.src = forecastimagesrc;

        
  //display forecast elements in cards, learned to use switch
        switch(i) {
            case 0:
                document.getElementById("forecast1Date").textContent = convertedForecastDate;
                document.getElementById('forecast1Icon').appendChild(forecastWeatherImage);

                document.getElementById('f1Temp').textContent = "Temp: " + forecastTemp + " °F"
                document.getElementById('f1Windspeed').textContent = "Windspeed: " + forecastWindspeed + " MPH"
                document.getElementById('f1Humidity').textContent = "Humidity: " + forecastHumidity + " %"  
            break;

            case 1:
                document.getElementById("forecast2Date").textContent = convertedForecastDate;
                document.getElementById('forecast2Icon').appendChild(forecastWeatherImage);

                document.getElementById('f2Temp').textContent = "Temp: " + forecastTemp + " °F"
                document.getElementById('f2Windspeed').textContent = "Windspeed: " + forecastWindspeed + " MPH"
                document.getElementById('f2Humidity').textContent = "Humidity: " + forecastHumidity + " %"   
            break;

            case 2:
                document.getElementById("forecast3Date").textContent = convertedForecastDate;
                document.getElementById('forecast3Icon').appendChild(forecastWeatherImage);

                document.getElementById('f3Temp').textContent = "Temp: " + forecastTemp + " °F"
                document.getElementById('f3Windspeed').textContent = "Windspeed: " + forecastWindspeed + " MPH"
                document.getElementById('f3Humidity').textContent = "Humidity: " + forecastHumidity + " %"  
            break;

            case 3:
                document.getElementById("forecast4Date").textContent = convertedForecastDate;
                document.getElementById('forecast4Icon').appendChild(forecastWeatherImage);

                document.getElementById('f4Temp').textContent = "Temp: " + forecastTemp + " °F"
                document.getElementById('f4Windspeed').textContent = "Windspeed: " + forecastWindspeed + " MPH"
                document.getElementById('f4Humidity').textContent = "Humidity: " + forecastHumidity + " %"  
            break;

            case 4:
                document.getElementById("forecast5Date").textContent = convertedForecastDate;
                document.getElementById('forecast5Icon').appendChild(forecastWeatherImage);

                document.getElementById('f5Temp').textContent = "Temp: " + forecastTemp + " °F"
                document.getElementById('f5Windspeed').textContent = "Windspeed: " + forecastWindspeed + " MPH"
                document.getElementById('f5Humidity').textContent = "Humidity: " + forecastHumidity + " %"  
            break;

            default:
                break;

        }
    }

  });

   
    //return false so search button click does not automatically refresh
    return false;
})