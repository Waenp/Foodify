package foodify.beans;

public class Ingredient {
    private String nameClean;
    private Measure measures;

    public String toString() {
        return String.format("%s of %s", measures, nameClean);
    }
}
