import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import foodify.beans.spoonacular.recipe.Recipe;
import foodify.beans.spotify.Parameters;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import io.javalin.plugin.bundled.CorsPluginConfig;

import java.util.Objects;


public class APIRunner {
    private Gson gson = null;
    private SpoonCaller spoonCaller;
    private SpotifyCaller spotifyCaller;

    public APIRunner() {
        String key = "";
        spoonCaller = new SpoonCaller(key);
        spotifyCaller = new SpotifyCaller();

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
                    if (Objects.equals(ctx.header("Content-Type"), "application/json")) {
                        String json = ctx.body();

                        runner.generateRecipes(json);
                        ctx.status(HttpStatus.CREATED);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }


                })
                .get("/recipes", ctx -> {
                    if (Objects.equals(ctx.header("Content-Type"), "application/json")) {
                        String json = runner.getRecipes();
                        ctx.status(HttpStatus.OK);
                        ctx.json(json);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .get("/recipes/{id}", ctx -> {
                    System.out.println("hämtar individuellt recept");
                    //TODO: ska vi använda index eller receptid?
                    if (Objects.equals(ctx.header("Content-Type"), "application/json")) {
                        String json = runner.getRecipe(ctx.pathParam("id"));
                        ctx.status(HttpStatus.OK);
                        ctx.json(json);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .post("/authorize", ctx -> {
                    if (Objects.equals(ctx.header("Content-Type"), "application/x-www-form-urlencoded; charset=UTF-8")) {
                        String accessToken = cleanString(ctx.body());
                        runner.authorize(accessToken);
                        ctx.status(HttpStatus.CREATED);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .post("/playlists", ctx -> {
                    if (Objects.equals(ctx.header("Content-Type"), "application/json")) {
                        Parameters parameters = runner.getParameters(ctx.body());

                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .start(5007);
    }

    private Parameters getParameters(String body) {
        return gson.fromJson(body, Parameters.class);
    }

    private void authorize(String accessToken) {
        spotifyCaller.authorize(accessToken);
    }

    private static String cleanString(String body) {
        String trimmedString = body.substring(14);
        String[] splitString = trimmedString.split("&");

        return splitString[0];
    }

    public void generateRecipes(String ingredients) {
        String[] ingredientsString = gson.fromJson(ingredients, String[].class);
        spoonCaller.generateRecipes(ingredientsString);
    }

    public String getRecipes() {
        Recipe[] recipes = spoonCaller.getRecipes();
        return gson.toJson(recipes);
    }

    public String getRecipe(String id) {
        Recipe recipe = spoonCaller.getRecipe(id);
        return gson.toJson(recipe);
    }

}
