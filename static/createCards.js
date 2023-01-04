
// Skapa ett template för alla kort på sökresultat-sidan
const cardTemplate = `
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
        <a href="#" class="btn btn-full-recipe">Full recipe</a>
        <a href="/views/create-playlist/step-1.html" class="btn btn-create-playlist">Create playlist!</a>
      </div>
    </div>
  </div>
</div>`

// för varje recept som hämtas:
// skapa nytt kort
// sätt kortets id == cardId

// Presenterar 10st olika recept-objekt

// Byt ut recipe name och recipe description mot data från API
$( document ).ready(function addArticle(){
  for (let i = 0; i < 10; i++) {

    document.querySelector('#recipeContainer').insertAdjacentHTML('beforeend', cardTemplate);

    document.getElementById("recipeName").id = ("recipeName" + i)
    document.getElementById("recipeDescription").id = ("recipeDescription" + i)

    let recipeName = "Pasta Carbonara";
    let recipeDescription = "En enkel rätt att laga, snabbt och gott!";
    let image = ""
    
    $("#recipeName"+i).text(recipeName);
    $("#recipeDescription" +i).text(recipeDescription);
    
}});
