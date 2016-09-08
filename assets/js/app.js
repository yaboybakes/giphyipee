var APIkey = "dc6zaTOxFJmzC";
var url = "http://api.giphy.com/v1/gifs/search?q=";
var search;
	var movies = ['The Matrix', 'The Notebook', 'Mr. Nobody', 'The Lion King'];

$(document).ready (function() {
  $('.title').html("VEGETABLES");
  renderButtons();

  function renderButtons(){

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#buttonMania').empty();

		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here...
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('movie'); // Added a class
		    a.attr('data-name', movies[i]); // Added a data-attribute
		    a.text(movies[i]); // Provided the initial button text
		    $('#buttonMania').append(a); // Added the button to the HTML
		}
	}

  console.log("search value is: " + search);

  $('#go-button').click(function() {
    console.log('go button has been clicked');
    search = $('#search-query').val();
    var new_url = url + search + "&api_key=" + APIkey;
    console.log('new_url: ' + new_url);
    console.log('search is: '+ search);
    $.ajax({
      url: new_url ,
      method: 'GET'})
      .done(function(response) {
          var results = response.data;
          console.log(response);
          for (var i = 0; i < results.length; i++) {
              var gifDiv = $('<div class="item">')

              var rating = results[i].rating;

              var p = $('<p>').text("Rating: " + rating);

              var personImage = $('<img>');
              personImage.attr('src', results[i].images.fixed_height.url);

              gifDiv.append(p)
              gifDiv.append(personImage)

              $('#gifsAppearHere').append(gifDiv);
          }
      });

      movies.push(search);
      renderButtons();
      
  });


});
