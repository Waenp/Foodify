$(document).ready(function () {
    let jsonArray = localStorage.getItem("ingredientArray");
    let ingredientArray = JSON.parse(jsonArray);
    $.ajax({
        method: "POST",
        url: "http://localhost:5007/recipes",
        data: JSON.stringify(ingredientArray),
        headers: { "Content-Type": "application/json" },
    }).done(function (result) {});
});