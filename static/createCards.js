
// Skapa ett template för alla kort på sökresultat-sidan
const cardTemplate =
`
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-lg-4">
      <img src="/static/images/Food3.jpg" class="img-food rounded-start" alt="..." id="recipeImage">
    </div>
    <div class="col-lg-8 d-flex flex-column">
      <div class="card-body overflow-auto">
        <h5 class="card-title" id="recipeName"></h5>
        <p class="card-text" id="recipeDescription"></div>
      <div class="card-footer d-grid gap-2 d-lg-flex mt-auto">
        <small class="text-muted me-auto" id="cookTime"></small>
        <a href="/views/recipes/recipe-page.html" class="btn btn-full-recipe">Full recipe</a>
        <a href="/views/create-playlist/authorize.html" class="btn btn-create-playlist">Create playlist!</a>
      </div>
    </div>
  </div>
</div>
`

// för varje recept som hämtas:
// skapa nytt kort
// sätt kortets id == cardId
// Presenterar 10st olika recept-objekt
// Byt ut recipe name och recipe description mot data från API
$( document ).ready(function addCard(){

  for (let i = 0; i < 10; i++) {
    let recipeName = "Pasta Carbonara";
    let recipeDescription = "En enkel rätt att laga, snabbt och gott!";
    let image = ""

    // Hämtar element med id "recipecontainer", lägger till ett cardTemplate i slutet
    document.querySelector('#recipeContainer').insertAdjacentHTML('beforeend', cardTemplate);

    // Ändrar id på "recipeName" och "recipeDescription"
      document.getElementById("recipeName").id = ("recipeName" + i)
    document.getElementById("recipeDescription").id = ("recipeDescription" + i)

    // Lägger till information från objektet i "recipeName" och "recipeDescription"
    $("#recipeName" + i).text(recipeName);
          $("#recipeDescription" + i).text(recipeDescription);

  }}
);

const url = "";

fetch(url)
.then((response) =>{
  return response.json();
})

.then((data) => {
  let recipes = data;
  
  recipes.map(function(){
    
    // Hämtar element med id "recipecontainer", lägger till ett cardTemplate i slutet
    document.querySelector('#recipeContainer')
            .insertAdjacentHTML('beforeend', cardTemplate);

    // Ändrar id på "recipeName" och "recipeDescription"
    document.getElementById("recipeName").id = ("recipeName" + i)
    document.getElementById("recipeDescription").id = ("recipeDescription" + i)

    // Lägger till information från objektet i "recipeName" och "recipeDescription"
    $("#recipeName" + i).text(recipeName);
    $("#recipeDescription" + i).text(recipeDescription);

  });

})

.catch(function(error){

})