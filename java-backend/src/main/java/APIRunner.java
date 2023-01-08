import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import foodify.beans.spoonacular.recipe.Recipe;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import io.javalin.plugin.bundled.CorsPluginConfig;


public class APIRunner {
    private Gson gson = null;
    private SpoonCaller spoonCaller;

    public APIRunner() {
        String key = "";
        spoonCaller = new SpoonCaller(key);

        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    }

    public static void main(String[] args) {
        APIRunner runner = new APIRunner();
        Javalin app = Javalin.create(javalinConfig -> {
            javalinConfig.plugins.enableCors(cors ->{
                cors.add(CorsPluginConfig::anyHost);
            });
                })
                .post("/recipes", ctx -> {
                    String json = ctx.body();

                    runner.generateRecipes(json);
                    ctx.status(HttpStatus.CREATED);

                })
                .get("/recipes", ctx -> {
                    if (ctx.header("Content-Type").equals("application/json")) {
                        String json = runner.getRecipes();
                        ctx.status(HttpStatus.OK);
                        ctx.json(json);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .get("/recipes/{index}", ctx -> {
                    System.out.println("hämtar individuellt recept");
                    //TODO: ska vi använda index eller receptid?
                    if (ctx.header("Content-Type").equals("application/json")) {
                        String json = runner.getRecipe(Integer.parseInt(ctx.pathParam("index")));
                        ctx.status(HttpStatus.OK);
                        ctx.json(json);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .post("/authorize", ctx -> {

                })
                .start(5007);
    }

    public void generateRecipes(String ingredients) {
        String[] ingredientsString = gson.fromJson(ingredients, String[].class);
        spoonCaller.generateRecipes(ingredientsString);
    }

    public String getRecipes() {
        Recipe[] recipes = spoonCaller.getRecipes();
        return gson.toJson(recipes);
    }

    public String getRecipe(int index) {
        Recipe recipe = spoonCaller.getRecipe(index);
        return gson.toJson(recipe);
    }

}
