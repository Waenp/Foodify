package foodify.beans;

import java.util.ArrayList;

public class Recipe {
    private String id;

    private Ingredient[] extendedIngredients;

    public String getId() {
        return id;
    }

    public String toString() {
        StringBuilder ingredients = new StringBuilder();
        for (int i = 0; i < extendedIngredients.length; i++) {
            ingredients.append(extendedIngredients[i].toString());
        }
        return String.format("""
                Id = %s
                Ingredients
                %s
                """, id, ingredients);
    }
}