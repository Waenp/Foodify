package foodify.beans.spoonacular.recipe;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Measure {
    public Metric metric;

    public String toString() {
        return metric.toString();
    }
}
