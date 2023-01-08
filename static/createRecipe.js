// Skapa templates för listitems och span i listorna
let ulTemplate = `<li id= "item" class="list-group-item d-flex justify-content-between align-items-center px-1"></li>`
let liSpanTemplate = `<span id= "amount" class="badge bg-dark rounded-pill p-2"></span>`
let olTemplate = `<li id= "instruction" class="list-group-item px-1"></li>`

$(document).ready(function addIngredient() {
  
  let recipeId = localStorage.getItem("recipeId")
  console.log(recipeId)
//TODO: vi behöver klura ut hur man får med sig rätt index från sidan innan (alternativt receptets id från API-svaret)

const url = "http://localhost:5007/recipes/" + recipeId

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

$("#recipeName").text(obj.title)
$("#recipeImg" ).attr("src", obj.image)
$("#recipeDescription").html("<p>" + obj.summary + "</p>");

let i = 0 

for (i; i < instructions.length; i++){
    let instructions = recipe[i].analyzedInstructions[i].steps[i].step
    
    console.log(instructions)

    document.querySelector("#instructions")
    .insertAdjacentHTML("beforeend", olTemplate);

    document.getElementById("instruction").id = "instruction" + i;

    $("#instruction" + i).text(instructions);

}

i = 0; 

let ingredients = recipe[i].extendedIngredients
ingredients.pop()
console.log(ingredients)

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

    let amounts = recipe[i].extendedIngredients[i].measures
    
    let measurements = Math.floor(amounts.metric.amount) + " " + amounts.metric.unitShort
    console.log(measurements)

    document.querySelector("#item" + i)
    .insertAdjacentHTML("beforeend", liSpanTemplate);

    document.getElementById("amount").id = "amount" + i;

    $("#amount" + i).text(measurements);

    };
})

.catch(function(error){
  console.log(error)
  })

}); 


});
