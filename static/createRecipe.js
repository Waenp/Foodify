// Skapa templates för listitems och span i listorna
let ulTemplate = `<li id= "item" class="list-group-item d-flex justify-content-between align-items-center px-1"></li>`
let liSpanTemplate = `<span id= "amount" class="badge bg-dark rounded-pill p-2"></span>`
let olTemplate = `<li id= "instruction" class="list-group-item px-1"></li>`

$(document).ready(function addIngredient() {

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

  $("#recipeImg" ).attr("src", obj.image)
  $("#recipeDescription").html("<p>" + obj.summary + "</p>");
  
  let i = 0 

  let instructions = obj.analyzedInstructions


  for (i; i < instructions.length; i++){
    let instructions = obj.analyzedInstructions[i].steps[i].step
    
    console.log(instructions)

    document.querySelector("#instructions")
    .insertAdjacentHTML("beforeend", olTemplate);

    document.getElementById("instruction").id = "instruction" + i;

    $("#instruction" + i).text(instructions);

  }

  let ingredients = obj.extendedIngredients
  ingredients.pop()

  for (i; i < ingredients.length; i++){

    document.querySelector("#ingredients")
    .insertAdjacentHTML("beforeend", ulTemplate);

    document.getElementById("item").id = "item" + i;

    let word = ingredients[i].nameClean
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters

    $("#item" + i).text(capitalizedWord);

    };

  for (let i = 0; i < ingredients.length; i++) {

    let amounts = obj.extendedIngredients[i].measures
    
    let measurements = Math.floor(amounts.metric.amount) + " " + amounts.metric.unitShort
    console.log(measurements)

    document.querySelector("#item" + i)
    .insertAdjacentHTML("beforeend", olTemplate);

    document.getElementById("amount").id = "amount" + i;

    $("#amount" + i).text(measurements);

  }

});

//TODO: vi behöver klura ut hur man får med sig rätt index från sidan innan (alternativt receptets id från API-svaret)
let index = 1;
const url = "http://localhost:5007/recipes/" + index

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
  let recipe = data;
  console.log(recipe)
  recipe.map(function(){
    
    // Hämtar listan med Id "ingredients" och skapar ett nytt element 
    // under denna baserat på "liTemplate"
    document.querySelector("#ingredients")
            .insertAdjacentHTML("beforeend", ulTemplate);

    // Sätter id på item
    document.getElementById("item").id = "item" + i;
    
    // fyller på item med information
    $("#item" + i).text(ingredients[0 + i]);

    document.querySelector("#item" + i)
    .insertAdjacentHTML("beforeend", liSpanTemplate);
    
    document.getElementById("amount").id = "amount" + i;

    $("#amount" + i).text(amounts[0 + i]);
  
  })

.catch(function(error){
  console.log(error)
  })
}); 
