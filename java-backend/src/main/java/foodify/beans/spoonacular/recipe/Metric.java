package foodify.beans.spoonacular.recipe;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Metric {
    public double amount;
    public String unitShort;

    public String toString() {
        return String.format("%.2f %s", amount, unitShort);
    }
}
