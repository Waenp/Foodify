

// Function that randomizes the background-color of the page
$(document).ready(function(){
  let colors = [ "rgb(228, 163, 159)", "rgb(188, 217, 233)", "rgb(25, 230, 140)" ]; // Bestämmer vilka färger som ska vara aktuella
  let splicedColor = []; //
  let randomNumber = Math.floor( Math.random() * colors.length ); // 
  let randomColor = colors[ randomNumber ]; // 

  splicedColor.length ? colors.push( splicedColor[ 0 ] ) : "NOP";
  splicedColor = colors.splice( randomNumber, 1 );

  $("#mainBody").attr('style', "backgound-color: blue !important", backgroundcolor = randomColor);
  $("#mainBody").attr('style', $("#mainBody").attr('style') + '; ' + 'background-color:' + randomColor + ' !important')

  let input = document.getElementById("searchInput");

  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("postRecipe").click();   
      }
    })

  function searchRecipe() {
    return function() {
    
    // Hämta sökvärdet från användaren
    let query = $('#searchInput').val();
  
    // Gör om sökningen till en sträng som delas på mellanslag
    let array = query.split(" ")
    console.log(array)
    
    $.ajax({
      method: "POST",
      url: 'http://localhost:5007/recipes',
      data: JSON.stringify(array),
      headers: {"Content-Type": "application/json"}
    })
    // .done(function(result) {
    // });
  }};

  $("#postRecipe").click(searchRecipe());

});
