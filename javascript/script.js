
var topics = ["Soccer", "Golf", "Tennis", "Football"];

function displaySportGifs() {
    $("#sports-view").empty();
    var sport = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=eGV3iEFmo7rXMBIFOBJolpk8RdNU5xDS&limit=10";


    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {

    let results = response.data;
    for (let i = 0; i < results.length; i++){
        var sportsDiv = $("<div class='sport'>");
        var rated = results[i].rating;
        var pOne = $("<p>").text("Rating: " + rated);
        var sportsImg = $("<img>")

        sportsDiv.append(pOne);
        sportsImg.attr("src", results[i].images.original_still.url);
        sportsImg.attr("data-still", results[i].images.original_still.url);
        sportsImg.attr("data-animate", results[i].images.original.url);
        sportsImg.attr("data-state", "still");
        sportsImg.attr("class", "gif");
        sportsDiv.append(sportsImg);
        $("#sports-view").prepend(sportsDiv);
    }
    });

}

function changeState(){
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}



function renderButtons() {   
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    a.addClass("sport-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}


$("#add-sport").on("click", function(event) {
  event.preventDefault();
  var sport = $("#sport-input").val().trim();
  topics.push(sport);
  renderButtons();
  return;
});

$(document).on("click", ".gif", changeState);

$(document).on("click", ".sport-btn", displaySportGifs);


renderButtons();