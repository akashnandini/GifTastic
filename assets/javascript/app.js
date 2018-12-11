 // Initial array of movies
 var topics = ["Tiger", "Lion", "Cat", "Dog"];

 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function displayAnimalInfo() {

   var animal = $(this).attr("data-name");
   //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=9SnBtHSAb2LMsAcSDqaXyjm1dbr8eGke&q?q=" + animal + "&limit=10";
   var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9SnBtHSAb2LMsAcSDqaXyjm1dbr8eGke&q=" + animal + "&limit=10";
   console.log(queryURL);

   // Creating an AJAX call for the specific movie button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
        console.log(response);
        $("#animals-view").empty();
        
        for (var i = 0; i < response.data.length; i++) {
            
            var rating = response.data[i].rating; 
            console.log("rating== "+rating);
            var title = response.data[i].title;  
            
            var $div = $('<div class="gifs">');
            var $image = $('<img>').addClass('images'); 
            var $p = $('<p class="rating">Rating: ' + rating + '</p>');
            
            $div.prepend( $p,$image);
            $image.attr('src', response.data[i].images.fixed_height_still.url) 
                .attr('data-still', response.data[i].images.fixed_height_still.url)
                .attr('data-animate', response.data[i].images.fixed_height.url);
            $("#animals-view").prepend($div) ;
        }
   });
}

function animate(){
    var animate = $(this).attr("data-state");
    if(animate==="still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
      }
      else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
      }
}

// Function for displaying movie data
function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("animal-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a animal button is clicked
  $("#add-animal").on("click", function(event) {
    $("#buttons-view").empty();
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "animal-btn"
  $(document).on("click", ".animal-btn", displayAnimalInfo);
  $(document).on("click", ".images", animate);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();