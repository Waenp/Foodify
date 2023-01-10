// Skapa ett template för alla kort på sökresultat-sidan
const cardTemplate = `
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-lg-4">
      <img src="" class="img-food rounded-start" alt="..." id="recipeImg">
    </div>
    <div class="col-lg-8 d-flex flex-column">
      <div class="card-body overflow-auto">
        <h5 class="h2 _medium _ls-1 _cur-context card-title" id="recipeName"></h5>
        <p class="_book _cur-context card-text" id="recipeDescription"></div>
      <div class="card-footer d-grid gap-2 d-lg-flex mt-auto">
        <p class="text-muted me-auto" id="cookTime"></p>
        <a href="recipe-page.html" class="bbb _medium btn btn-full-recipe">Full recipe</a>
        <a href="/views/create-playlist/authorize.html" class="sss _medium btn btn-create-playlist">Create playlist!</a>
      </div>
    </div>
  </div>
</div>
`;

$(document).ready(function addCard() {
  const url = "http://localhost:5007/recipes";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      let recipes = data;
      console.log(recipes);
      for (let i = 0; i < recipes.length; i++) {
        // Hämtar element med id "recipecontainer", lägger till ett cardTemplate i slutet
        document
          .querySelector(".recipeContainer")
          .insertAdjacentHTML("beforeend", cardTemplate);

        summary = recipes[i].summary;
        finalSummary = summary.substring(0, summary.lastIndexOf(". "));
        // Ändrar id på "recipeName" och "recipeDescription"
        $("#recipeName").attr("id", "recipeName" + i);
        $("#recipeDescription").attr("id", "recipeDescription" + i);
        $("#recipeImg").attr("id", "recipeImg" + i);
        $("#cookTime").attr("id", "cookTime" + i);
        // Lägger till information från objektet i varje kort
        $("#recipeName" + i).text(recipes[i].title);
        $("#recipeDescription" + i).html(finalSummary + ".");
        $("#recipeImg" + i).attr("src", recipes[i].image);
        $("#cookTime" + i).text(
          "Total cook time: " + recipes[i].readyInMinutes + " minutes"
        );
      }

      $(".sss").on("click", function () {
        localStorage.removeItem("recipeObj");
        // When a button is clicked...
        var spotify = $(".sss").index(this);
        localStorage.setItem("recipeObj", JSON.stringify(recipes[spotify])); // Save the id to local storage
      });

      $(".bbb").on("click", function () {
        localStorage.removeItem("recipeObj");
        // When a button is clicked...
        var recipe = $(".bbb").index(this);
        localStorage.setItem("recipeObj", JSON.stringify(recipes[recipe])); // Save the id to local storage
      });
    });
});
