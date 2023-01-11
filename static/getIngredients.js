

let input = document.getElementById("searchInput");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keyup", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("postRecipe").click();
    }
});

function searchRecipe() {
    return function () {
        // Hämta sökvärdet från användaren
        let query = $("#searchInput").val();
        // Gör om sökningen till en sträng som delas på mellanslag
        let array = query.split(" ");
        localStorage.setItem("ingredientArray", JSON.stringify(array));
    };
}

$("#postRecipe").click(searchRecipe());