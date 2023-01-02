import com.google.gson.Gson;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import foodify.beans.Recipe;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;



public class SpoonCaller {
    private HttpClient httpClient;
    private HttpGet httpGet;
    private HttpResponse response;
    private StatusLine status;
    private HttpEntity entity;
    private InputStream data;
    private Reader reader;
    private Gson json = new Gson();

    private Recipe recipe;

    public SpoonCaller(String[] ingredients) {
        //TODO: lägg in valideringstoken
        StringBuilder stringBuilder = new StringBuilder("https://api.spoonacular.com/recipes/complexSearch?");
        stringBuilder.append("instructionsRequired=true");
        stringBuilder.append("&number=5");
        stringBuilder.append("&limitLicense=true");
        stringBuilder.append("&includeIngredients=");
        for (int i = 0; i < ingredients.length; i++) {
            if (i == ingredients.length - 1) {
                stringBuilder.append(ingredients[i]);
            }
            stringBuilder.append(ingredients[i] + ",");

        }

        try {
            httpClient = HttpClients.createDefault();
            httpGet = new HttpGet(stringBuilder.toString());

            response = httpClient.execute(httpGet);
            status = response.getStatusLine();
            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                try {
                    reader = new InputStreamReader(data);
                    //TODO: lägg in böna!
                    recipe = json.fromJson(reader, Recipe.class);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                //TODO: felhantering änna
                System.out.println("Det sket sig");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
