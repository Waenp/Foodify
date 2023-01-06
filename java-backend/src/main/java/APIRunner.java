import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javalin.Javalin;


public class APIRunner {
    private Gson gson = null;

    public APIRunner() {
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    }

    public static void main(String[] args) {
        APIRunner runner = new APIRunner();
        Javalin app = Javalin.create(javalinConfig -> {})
                .get("/recipes", ctx -> {
                    String ingredientsRaw = ctx.body();
                    String[] ingredients = ingredientsRaw.split(",");

                    String key = "";
                    SpoonCaller spoonCaller = new SpoonCaller(ingredients, key);

                    ctx.json(spoonCaller.getRecipes());

                })
                .start(5007);
    }
}
