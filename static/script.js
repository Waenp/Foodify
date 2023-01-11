// Function that randomizes the background-color of the page
$(document).ready(function () {
  let colors = [
    "rgb(228, 163, 159)",
    "rgb(188, 217, 233)",
    "rgb(25, 230, 140)",
  ]; // Bestämmer vilka färger som ska vara aktuella
  let splicedColor = []; //
  let randomNumber = Math.floor(Math.random() * colors.length); //
  let randomColor = colors[randomNumber]; //

  splicedColor.length ? colors.push(splicedColor[0]) : "NOP";
  splicedColor = colors.splice(randomNumber, 1);

  $("#mainBody").attr(
    "style",
    "backgound-color: blue !important",
    (backgroundcolor = randomColor)
  );
  $("#mainBody").attr(
    "style",
    $("#mainBody").attr("style") +
      "; " +
      "background-color:" +
      randomColor +
      " !important"
  );
});
