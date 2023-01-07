package foodify.beans.spoonacular.recipe;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Step {
    public int number;
    public String step;
    public Equipment[] equipment;

    public String toString() {
        return String.format("""
                Number: %d
                Step: %s
                """, number, step);
    }
}
