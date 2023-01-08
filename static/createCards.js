
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
$( document ).ready(function addCard(recipes){

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

    const obj = {
      "id": "640803",
      "title": "Crispy Buttermilk Fried Chicken",
      "readyInMinutes": 45,
      "servings": 6,
      "sourceUrl": "https://www.foodista.com/recipe/G2QDD6GF/crispy-buttermilk-fried-chicken",
      "spoonacularSourceUrl": "https://spoonacular.com/crispy-buttermilk-fried-chicken-640803",
      "image": "https://spoonacular.com/recipeImages/640803-556x370.jpg",
      "summary": "Forget going out to eat or ordering takeout every time you crave Southern food. Try making Crispy Buttermilk Fried Chicken at home. One portion of this dish contains roughly <b>16g of protein</b>, <b>15g of fat</b>, and a total of <b>260 calories</b>. For <b>62 cents per serving</b>, this recipe <b>covers 9%</b> of your daily requirements of vitamins and minerals. This recipe serves 6. 53 people found this recipe to be delicious and satisfying. This recipe from Foodista requires vegetable oil, buttermilk, salt, and paprika. It works best as a main course, and is done in roughly <b>around 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 38%</b>, which is rather bad. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/crispy-buttermilk-fried-chicken-912357\">Crispy Buttermilk Fried Chicken</a>, <a href=\"https://spoonacular.com/recipes/crispy-buttermilk-fried-chicken-32074\">Crispy Buttermilk Fried Chicken</a>, and <a href=\"https://spoonacular.com/recipes/crispy-oven-fried-buttermilk-chicken-244810\">Crispy Oven Fried Buttermilk Chicken</a>.",
      "cuisines": [
          "Southern"
      ],
      "instructions": "Mix flour, salt, paprika and pepper. Dip chicken in buttermilk and then into flour mixture. Cook chicken in oil, starting on medium-high heat, then, when chicken is browned, reduce heat to medium and cook an additional 30 to 35 minutes until chicken is done (approx 150-155 degrees F internal), turning occasionally.",
      "analyzedInstructions": [
          {
              "steps": [
                  {
                      "number": 1,
                      "step": "Mix flour, salt, paprika and pepper. Dip chicken in buttermilk and then into flour mixture. Cook chicken in oil, starting on medium-high heat, then, when chicken is browned, reduce heat to medium and cook an additional 30 to 35 minutes until chicken is done (approx 150-155 degrees F internal), turning occasionally.",
                      "equipment": []
                  }
              ]
          }
      ],
      "extendedIngredients": [
          {
              "nameClean": "whole chicken",
              "measures": {
                  "metric": {
                      "amount": 907.185,
                      "unitShort": "g"
                  }
              }
          },
          {
              "nameClean": "wheat flour",
              "measures": {
                  "metric": {
                      "amount": 177.441,
                      "unitShort": "ml"
                  }
              }
          },
          {
              "nameClean": "table salt",
              "measures": {
                  "metric": {
                      "amount": 2.0,
                      "unitShort": "tsps"
                  }
              }
          },
          {
              "nameClean": "paprika",
              "measures": {
                  "metric": {
                      "amount": 1.0,
                      "unitShort": "tsp"
                  }
              }
          },
          {
              "nameClean": "black pepper",
              "measures": {
                  "metric": {
                      "amount": 1.0,
                      "unitShort": "tsp"
                  }
              }
          },
          {
              "nameClean": "buttermilk",
              "measures": {
                  "metric": {
                      "amount": 236.588,
                      "unitShort": "ml"
                  }
              }
          },
          {
              "measures": {
                  "metric": {
                      "amount": 1.0,
                      "unitShort": "serving"
                  }
              }
          }
      ]
    }

  
    $("#recipeName" + i).text(obj.title);
    $("#recipeDescription" + i).html("<p>" + obj.summary + "</p>");
    $("#recipeImg" ).attr("src", obj.image)
    $("#cookTime" + i).text(obj.readyInMinutes + "minutes")

  }}
);

const url = "http://localhost:5007/recipes";

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
  console.log(data)
  
  recipes.map(function(){
    for (let i; i < recipes.length; i++){
      // Hämtar element med id "recipecontainer", lägger till ett cardTemplate i slutet
      document.querySelector('#recipeContainer')
              .insertAdjacentHTML('beforeend', cardTemplate);

      // Ändrar id på "recipeName" och "recipeDescription"
      document.getElementById("recipeName").id = ("recipeName" + i)
      document.getElementById("recipeDescription").id = ("recipeDescription" + i)
      document.getElementById("recipeImage").id = ("recipeImage" + i)
      document.getElementById("cookTime").id = ("cookTime" + i)

      // Lägger till information från objektet i "recipeName" och "recipeDescription"
      $("#recipeName" + i).text(recipes.title);
      $("#recipeDescription" + i).text(recipes.summary);
      $("#recipeImage" + i).attr("src", recipes.image)
      $("#cookTime" + i).text(recipes.readyInMinutes)
    }})
})

.catch(function(error){

})

