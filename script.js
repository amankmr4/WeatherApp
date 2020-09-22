//lets grab the input area into a varibale
var citytxt = $("#citytxt");
var cityButton = $("#citybtn");
var newCitiesArea = $(".cityList")
var cityarray = []
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//now lets try to create a onclick fucntion that will add that value to our buuton below
$(cityButton).on("click", function (event) {
    event.preventDefault();
    // here we have got the text within the input 
    var citySeacrhtxt = $("input").val();
    console.log(citySeacrhtxt);
    cityarray.push(citySeacrhtxt);
    console.log(cityarray);

    createButton();

    citytxt.val("");
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

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        var cityName = response.name;
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed

        console.log(cityName);
        console.log(temperature);
        console.log(humidity);
        console.log(windSpeed);


    });

}

function displayWeather() {
    var cityclicked = $(this).attr("data-name");
    currentWeather(cityclicked);
}

// now lets run a onclick function on the buttons on the citylist
$(document).on("click", ".cityButton", displayWeather);
