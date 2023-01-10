$(document).ready(function () {
  let body = new Object();
  let recipeObj = localStorage.getItem("recipeObj");
  let recipe = JSON.parse(recipeObj);

  body.mood = localStorage.getItem("mood");
  body.tempo = localStorage.getItem("tempo");
  body.cuisine = recipe.cuisines[0];
  body.dish = recipe.title;

  $.ajax({
    method: "POST",
    url: "http://localhost:5007/playlist",
    data: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).done(function (result) {});
});
