package foodify.beans.spoonacular.recipe;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class AnalyzedInstructions {
    public Step[] steps;

    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < steps.length; i++) {
            stringBuilder.append(steps[i].toString()).append("\n");
        }

        return stringBuilder.toString();
    }
}
