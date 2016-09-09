var APIkey = "dc6zaTOxFJmzC";
var url = "http://api.giphy.com/v1/gifs/search?q=";
var search;
var movies = ['The Matrix', 'The Notebook', 'Mr. Nobody', 'The Lion King'];

function changeState() {

}

$(document).ready (function() {
  $('body').on('click','.giphy-image',function(){
    var state = $(this).data("state");
    console.log(state);
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).data('state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).data('state', 'still');
    }
  });

  function renderButtons(){

		$('#buttonMania').empty();

		for (var i = 0; i < movies.length; i++){

		    var a = $('<button>');
		    a.addClass('movie');
		    a.attr('data-name', movies[i]);
        a.attr('data-state', "still");
        a.attr('data-still', "");
        a.attr('data-animate', "");

		    a.text(movies[i]);
		    $('#buttonMania').append(a);
		}

	}
  renderButtons();

  $('#go-button').click(function() {
    search = $('#search-query').val();
    var new_url = url + search + "&api_key=" + APIkey;
    $.ajax({
      url: new_url ,
      method: 'GET'})
      .done(function(response) {

          var results = response.data;
          $('#gifsAppearHere').empty();

          console.log(response);
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $('<div class="col-xs-4 giphy-img">')

              var rating = results[i].rating;

              var p = $('<p>').text("Rating: " + rating);

              var personImage = $('<img class="giphy-image">');
              personImage.attr('src', results[i].images.fixed_width_small_still.url);
              personImage.attr('data-still', results[i].images.fixed_width_small_still.url);
              personImage.attr('data-animate', results[i].images.fixed_width_small.url);
              personImage.attr('data-state', "still");
              console.log("state is : " + personImage.data("data-state"));

              gifDiv.append(p);
              gifDiv.append(personImage);

              $('#gifsAppearHere').append(gifDiv);
          }
      });

      movies.push(search);
      renderButtons();

  });

  $('.movie').click(function() {
    search = $(this).data("name");
    var new_url = url + search + "&api_key=" + APIkey;
    $.ajax({
      url: new_url ,
      method: 'GET'})
      .done(function(response) {
          var results = response.data;
          console.log(response);
          $('#gifsAppearHere').empty();
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $('<div class="col-xs-4 giphy-img">');

              var rating = results[i].rating;

              var p = $('<p>').text("Rating: " + rating);

              var personImage = $('<img class="giphy-image">');
              personImage.attr('src', results[i].images.fixed_width_small_still.url);
              personImage.attr('data-still', results[i].images.fixed_width_small_still.url);
              personImage.attr('data-animate', results[i].images.fixed_width_small.url);
              personImage.attr('data-state', "still");

              gifDiv.append(p);
              gifDiv.append(personImage);

              $('#gifsAppearHere').append(gifDiv);
          }
      });
  });

});
