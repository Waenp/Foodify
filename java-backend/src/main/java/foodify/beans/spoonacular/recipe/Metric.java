package foodify.beans.spoonacular.recipe;

public class Metric {
    private double amount;
    private String unitShort;

    public String toString() {
        return String.format("%.2f %s", amount, unitShort);
    }
}