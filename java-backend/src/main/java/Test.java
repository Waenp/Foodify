import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] ingredients = {"tomato", "lettuce", "vinegar"};
        String apiKey = sc.nextLine();
        SpoonCaller spoonCaller = new SpoonCaller(ingredients, apiKey);
    }
}
