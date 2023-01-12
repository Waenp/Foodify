import Keys.ApiKey;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import foodify.beans.spoonacular.recipe.Recipe;
import foodify.beans.spotify.Parameters;
import foodify.beans.spotify.UserPLayList;
import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import io.javalin.plugin.bundled.CorsPluginConfig;

import java.util.Objects;


public class APIRunner {
    private Gson gson = null;
    private SpoonCaller spoonCaller;
    private SpotifyCaller spotifyCaller;

    public APIRunner() {
        ApiKey apiKey = new ApiKey();
        String key = apiKey.getKey();
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
                    if (Objects.equals(ctx.header("Content-Type"), "application/json")) {
                        String jsonResponse = runner.getRecipe(ctx.pathParam("id"));
                        ctx.status(HttpStatus.OK);
                        ctx.json(jsonResponse);
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
                .post("/playlist", ctx -> {
                    if (Objects.equals(ctx.header("Content-Type"), "application/json")) {
                        Parameters parameters = runner.getParameters(ctx.body());
                        runner.createPlaylist(parameters);
                        ctx.status(HttpStatus.CREATED);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .get("/playlist", ctx -> {
                    if (Objects.equals(ctx.header("Accept"), "application/json")) {
                        String jsonResponse = runner.getPlaylist();
                        ctx.json(jsonResponse);
                        ctx.status(HttpStatus.OK);
                    } else {
                        ctx.status(HttpStatus.BAD_REQUEST);
                    }
                })
                .start(5007);
    }

    private String getPlaylist() {
        UserPLayList pLayList = spotifyCaller.getCreatedPlaylist();
        return gson.toJson(pLayList);
    }

    private void createPlaylist(Parameters parameters) {
        spotifyCaller.searchForItem(parameters.getDish(), parameters.getCuisine(), parameters.getMood(), parameters.getTempo());
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
        String[] ingredientsStrings = gson.fromJson(ingredients, String[].class);
        for (String s : ingredientsStrings) {
            System.out.println(s);
        }
        spoonCaller.generateRecipes(ingredientsStrings);
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
