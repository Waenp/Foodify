package foodify.beans;

import java.util.ArrayList;

public class Recipe {
    private String title;
    private String description;
    private String image;
    private ArrayList<String> ingredients;
    private String instructions;

    private String cuisine;

    public Recipe() {

    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return image;
    }

    public ArrayList<String> getIngredients() {
        return ingredients;
    }

    public String getInstructions() {
        return instructions;
    }
}