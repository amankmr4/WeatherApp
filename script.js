//lets grab the input area into a varibale
var citytxt = $("#citytxt");
var cityButton = $("#citybtn");
var newCitiesArea = $(".cityList")
var currentMoment = moment().format('L');
var cityarray = []
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//now lets try to create a onclick fucntion that will add that value to our buuton below
$(cityButton).on("click", function (event) {
    event.preventDefault();
    var citySeacrhtxt = $("input").val().trim();

    if (citySeacrhtxt) {
        cityarray.push(citySeacrhtxt);
        createButton();
        citytxt.val("");
    } else {
        alert("please enter city name?");
    }
});

//lets create a function that will create new buttons
function createButton() {
    newCitiesArea.empty();
    cityarray.forEach(function (city) {
        var newBtn = $("<button>").text(city);
        newBtn.addClass("col-12 cityButton");
        newBtn.attr("data-name", city);

        newCitiesArea.append(newBtn);

    }
    )
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lets focus on the city list buttons to call the API
function currentWeather(cityclicked) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityclicked + "&units=imperial&appid=4591a3428058e369dab3f9b2d3ba83e8";
    var currentLat;
    var currentLong;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        var cityName = response.name;
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed
        var weatherIcon = response.weather[0].icon


        var cityName$ = $("<h3>").text(cityName).append(" " + currentMoment);
        var temperature$ = $("<p>").text("Temperature: " + temperature + "°F");
        var humidity$ = $("<p>").text("Humidity: " + humidity + "%");
        var windSpeed$ = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
        var weatherIcon$ = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");


        $("#currentWeather").empty();

        $(cityName$).append(weatherIcon$);
        $("#currentWeather").prepend(cityName$, temperature$, humidity$, windSpeed$);

        var currentLat = response.coord.lat;
        var currentLong = response.coord.lon;

        getUV(currentLat, currentLong);

    });

}


// this fucntion will get the UV index
function getUV(currentLat, currentLong) {
    var queryRUL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + currentLat + "&lon=" + currentLong + "&appid=4591a3428058e369dab3f9b2d3ba83e8";

    $.ajax({
        url: queryRUL,
        method: "GET"
    }).then(function (response) {

        var uvID = response.value;
        var udID$ = $("<p>").text("UV Index: " + uvID);
        $("#currentWeather").append(udID$);


    })

}


//Now lets write a function to get all the weekly condition
function forecast5days(cityclicked) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityclicked + "&appid=4591a3428058e369dab3f9b2d3ba83e8";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var divcount = 1;
        for (var i = 0; i < response.list.length; i++) {

            var time = moment(response.list[i].dt_txt).format("HH");

            if (time == 00) {


                var cityName$ = $("<h5>").text(moment(response.list[i].dt_txt).format("l"));
                var weatherIcon$ = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                var temperature$ = $("<p>").text("Temperature " + response.list[i].main.temp + "°F");
                var humidity$ = $("<p>").text("Humidity " + response.list[i].main.humidity + "%");
                $("#day" + divcount).prepend(cityName$, weatherIcon$, temperature$, humidity$);
                divcount++;

            }
        }
    })
}


//this funxtion will clear our divs
function clearDiv() {
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();
}



//this function shows the weather
function displayWeather() {
    var cityclicked = $(this).attr("data-name");
    currentWeather(cityclicked);
    clearDiv();
    forecast5days(cityclicked);

}

// now lets run a onclick function on the buttons on the citylist
$(document).on("click", ".cityButton", displayWeather);
