let liTemplate = `<li id="item" class="list-group-item d-flex justify-content-between align-items-center px-1"></li>`
let liSpan = `<span id="amount" class="badge bg-dark rounded-pill p-2"></span>`

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
              .insertAdjacentHTML("beforeend", liSpan);

      document.getElementById("amount").id = "amount" + i;

      $("#amount" + i).text(amounts[0 + i]);
    };
  };

  addAmount();
});

