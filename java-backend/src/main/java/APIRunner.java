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
                    String json = ctx.body();


                })
                .start(5007);
    }
}
