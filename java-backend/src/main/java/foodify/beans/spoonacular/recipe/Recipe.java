package foodify.beans.spoonacular.recipe;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Recipe {
    private String id;
    private String title;
    private int readyInMinutes;
    private int servings;
    private String sourceUrl;
    private String spoonacularSourceUrl;
    private String image;
    private String summary;
    private String[] cuisines;
    private String instructions;
    public AnalyzedInstructions[] analyzedInstructions;
    public Ingredient[] extendedIngredients;

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getReadyInMinutes() {
        return readyInMinutes;
    }

    public int getServings() {
        return servings;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public String getSpoonacularSourceUrl() {
        return spoonacularSourceUrl;
    }

    public String getImage() {
        return image;
    }

    public String getSummary() {
        return summary;
    }

    public String[] getCuisines() {
        return cuisines;
    }

    public String getInstructions() {
        return instructions;
    }

    public Ingredient[] getExtendedIngredients() {
        return extendedIngredients;
    }

    public void setCuisines(String[] newCuisines) {
        cuisines = new String[newCuisines.length];
        for (int i = 0; i < cuisines.length; i++) {
            cuisines[i] = newCuisines[i];
        }
    }

    public String toString() {
        StringBuilder ingredients = new StringBuilder();
        for (int i = 0; i < extendedIngredients.length; i++) {
            ingredients.append(extendedIngredients[i].toString());
        }
        StringBuilder cuisineTypes = new StringBuilder();
        for (int i = 0; i < cuisines.length; i++) {
            cuisineTypes.append(cuisines[i]).append(", ");
        }
        StringBuilder analyzedInstructionsStrings = new StringBuilder();
        for (int i = 0; i < analyzedInstructions.length; i++) {
            analyzedInstructionsStrings.append(analyzedInstructions[i]);
        }

        return String.format("""
                Id = %s
                %s
                Ready in %d minutes
                %d servings
                Ingredients
                %s
                Analyzed Instructions: %s
                Cuisine(s): %s
                """, id, title, readyInMinutes, servings, ingredients, analyzedInstructionsStrings, cuisineTypes);
    }
}