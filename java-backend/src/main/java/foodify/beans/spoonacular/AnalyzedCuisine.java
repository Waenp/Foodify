package foodify.beans.spoonacular;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class AnalyzedCuisine {
    private String cuisine;
    private String[] cuisines;
    private double confidence;

    public String getCuisine() {
        return cuisine;
    }

    public String[] getCuisines() {
        return cuisines;
    }

    public double getConfidence() {
        return confidence;
    }
}
