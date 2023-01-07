// Skapa templates för listitems och span i listorna
let liTemplate = `<li id="item" class="list-group-item d-flex justify-content-between align-items-center px-1"></li>`
let liSpanTemplate = `<span id="amount" class="badge bg-dark rounded-pill p-2"></span>`

$(document).ready(function addIngredient() {
  let ingredients = ["Wheat", "Oat", "Milk"];
  let amounts = ["3 dl", "200 g", "5 l"];

  for (let i = 0; i < ingredients.length; i++) {
    document.querySelector("#ingredients")
            .insertAdjacentHTML("beforeend", liTemplate);

    document.getElementById("item").id = "item" + i;

    $("#item" + i).text(ingredients[0 + i]);
  };

  function addAmount() {
    for (let i = 0; i < amounts.length; i++) {
      document.querySelector("#item" + i)
              .insertAdjacentHTML("beforeend", liSpanTemplate);

      document.getElementById("amount").id = "amount" + i;

      $("#amount" + i).text(amounts[0 + i]);
    };
  };
  addAmount();
});

const url = ""

fetch(url)
.then((response) =>{
  return response.json();
})

.then((data) => {
  let recipe = data;
  
  recipe.map(function(){
    
    // Hämtar listan med Id "ingredients" och skapar ett nytt element 
    // under denna baserat på "liTemplate"
    document.querySelector("#ingredients")
            .insertAdjacentHTML("beforeend", liTemplate);

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
