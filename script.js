//lets grab the input area into a varibale
var citytxt = $("#citytxt");
var cityButton = $("#citybtn");
var newCitiesArea = $(".cityList")
var cityarray =  []

//now lets try to create a onclick fucntion that will add that value to our buuton below
$("button").on("click", function(event) {
    event.preventDefault();
    // here we have got the text within the input 
var citySeacrhtxt = $("input").val();
console.log(citySeacrhtxt);

var newBtn = $("<button>").text(citySeacrhtxt);
newBtn.addClass("col-12");

newCitiesArea.append(newBtn);

citytxt.val("");





});

