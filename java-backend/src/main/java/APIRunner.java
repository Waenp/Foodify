import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javalin.Javalin;
import io.javalin.plugin.bundled.CorsPluginConfig;


public class APIRunner {
    private Gson gson = null;

    public APIRunner() {
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    }

    public static void main(String[] args) {
        APIRunner runner = new APIRunner();
        Javalin app = Javalin.create(javalinConfig -> {
            javalinConfig.plugins.enableCors(cors ->{
                cors.add(CorsPluginConfig::anyHost);
            });
                })
                .post("/recipes/search-result", ctx -> {
                    String ingredientsRaw = ctx.body();
                    String[] ingredients = ingredientsRaw.split(",");
                    System.out.println("hejlo");

                    String key = "";
                    SpoonCaller spoonCaller = new SpoonCaller(ingredients, key);

                    ctx.json(spoonCaller.getRecipes());

                })
                .start(5007);
    }
}
