
// Skapa ett template för alla kort på sökresultat-sidan
const cardTemplate =
`
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-lg-4">
      <img src="" class="img-food rounded-start" alt="..." id="recipeImg">
    </div>
    <div class="col-lg-8 d-flex flex-column">
      <div class="card-body overflow-auto">
        <h5 class="card-title" id="recipeName"></h5>
        <p class="card-text" id="recipeDescription"></div>
      <div class="card-footer d-grid gap-2 d-lg-flex mt-auto">
        <p class="text-muted me-auto" id="cookTime"></p>
        <a id="link" href="" class="btn btn-full-recipe">Full recipe</a>
        <a href="/views/create-playlist/authorize.html" class="btn btn-create-playlist">Create playlist!</a>
      </div>
    </div>
  </div>
</div>
`
$( document ).ready(function addCard(){


const url = "http://localhost:5007/recipes" ;

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

.then((response) =>{
  return response.json();
})

.then((data) => {
  let recipes = data;

  for (let i = 0; i < recipes.length; i++){

  // Hämtar element med id "recipecontainer", lägger till ett cardTemplate i slutet
  document.querySelector('#recipeContainer').insertAdjacentHTML('beforeend', cardTemplate);

  summary = recipes[i].summary;
  finalSummary = summary.substring(0, summary.lastIndexOf(". "));

  // Ändrar id på "recipeName" och "recipeDescription"
  document.getElementById("recipeName").id = ("recipeName" + i);
  document.getElementById("recipeDescription").id = ("recipeDescription" + i);
  document.getElementById("recipeImg").id = ("recipeImg" + i);
  document.getElementById("link").id = (recipes[i].id);
  document.getElementById("cookTime").id = ("cookTime" + i)

  // Lägger till information från objektet i varje kort
  $("#"+ recipes[i].id).attr("href", "/views/recipes/" + recipes[i].id);
  $("#recipeName" + i).text(recipes[i].title);
  $("#recipeDescription" + i).html(finalSummary + ".");
  $("#recipeImg" + i).attr("src", recipes[i].image);
  $("#cookTime" + i).text(recipes[i].readyInMinutes + "minutes");

  document.getElementById("link")

  };

  $("#"+ recipes[i].id).click(localStorage.setItem("recipeId",recipes[i].id));
    
  } 

)

.catch(function(){

  })
})
