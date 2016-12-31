var long;
var lat;
var fahrenheit;
var celsius;
var api;
var rain = "http://megaicons.net/static/img/icons_sizes/395/1164/512/rain-icon.png";
var snow = "http://megaicons.net/static/img/icons_sizes/395/1164/256/snow-icon.png";
var thunderstorm = "http://megaicons.net/static/img/icons_sizes/395/1164/256/thunder-icon.png";
var cloudy = "http://megaicons.net/static/img/icons_sizes/395/1164/256/partly-cloudy-day-icon.png";
var clear = "http://megaicons.net/static/img/icons_sizes/314/810/256/status-weather-clear-icon.png";
var mist = "http://megaicons.net/static/img/icons_sizes/15/1186/256/fog-icon.png";

//User location information
if(navigator.geolocation) {
  //gets users location
  navigator.geolocation.getCurrentPosition(function(position) {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=30eebcde869e5ccf669526689454de80";
    
    //used to get weather data from api
    $.getJSON(api, function(data) {
      //variables for weather and location data
      var city = data.name;
      var country = data.sys.country;
      var weather = data.weather[0].description;
      var temp = data.main.temp;
      
      //variables rounded non kelvin temperatures
      fahrenheit = Math.round(1.8 * (temp - 273) + 32);
      celsius = Math.round(temp - 273.15);
      
      //inputs city/country/weather/temp data to page
      $(".city-country").text(city + ", " + country);
      $(".weather").text(weather);
      $(".temp").text("Temp: " + fahrenheit + "°F");
      
      //inputs image for weather
      if(weather === "clear sky") {
        $(".weather-img").attr("src", clear);
      } 
      else if(weather === "few clouds" || weather === "scattered clouds" || weather === "broken clouds") {
        $(".weather-img").attr("src", cloudy);
      } 
      else if(weather === "shower rain" || weather === "rain" || weather === "light rain") {
        $(".weather-img").attr("src", rain);
      }
      else if(weather === "thunderstorm") {
        $(".weather-img").attr("src", thunderstorm);
      } 
      else if(weather === "mist" || weather === "fog") {
        $(".weather-img").attr("src", mist);
      }
      else {
        $(".weather-img").attr("src", snow);
      };
      
      //button functionality for temp conversions
      $(".imperial").click(function() {
        $(".temp").text("Temp: " + fahrenheit + "°F");
      });
      
      $(".metric").click(function() {
        $(".temp").text("Temp: " + celsius + "°C");
      });
      
    });
  });
};

  