var APIkey = "dc6zaTOxFJmzC";
var url = "http://api.giphy.com/v1/gifs/search?q=";
var search;

$(document).ready (function() {
  $('.title').html("VEGETABLES");

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
  });


});
