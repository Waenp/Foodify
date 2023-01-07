package foodify.beans.spoonacular.recipe;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Ingredient {
    public String nameClean;
    public Measure measures;

    public String getNameClean() {
        return nameClean;
    }

    public Measure getMeasures() {
        return measures;
    }

    public String toString() {
        return String.format("%s of %s\n", measures, nameClean);
    }
}
