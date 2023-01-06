package foodify.beans.spoonacular.recipe;

public class Ingredient {
    private String nameClean;
    private Measure measures;

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
