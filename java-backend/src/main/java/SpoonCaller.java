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

    private Recipe[] recipes;


    public SpoonCaller(String[] ingredients, String apiKey) {

        searchByIngredients(ingredients, apiKey);

        /*
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
        stringBuilder.append("&apiKey=" + apiKey);

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

         */
    }

    private void searchByIngredients(String[] ingredients, String apiKey) {
        StringBuilder stringBuilder =  new StringBuilder("https://api.spoonacular.com/recipes/findByIngredients?");
        stringBuilder.append("ingredients=");
        for (int i = 0; i < ingredients.length; i++) {
            if (i == ingredients.length - 1) {
                stringBuilder.append(ingredients[i]);
            } else {
                stringBuilder.append(ingredients[i]).append(",");
            }

        }
        stringBuilder.append("&number=10");
        stringBuilder.append("&ranking=2");
        stringBuilder.append("&ignorePantry=true");
        stringBuilder.append("&apiKey=").append(apiKey);
        getCall(stringBuilder.toString());

        String[] ids = new String[recipes.length];
        for (int i = 0; i < recipes.length; i++) {
            ids[i] = recipes[i].getId();
        }

        getInformationBulk(ids, apiKey);
    }

    private void getInformationBulk(String[] ids, String apiKey) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spoonacular.com/recipes/informationBulk?");
        stringBuilder.append("ids=");
        for (int i = 0; i < ids.length; i++) {
            if (i == ids.length - 1) {
                stringBuilder.append(ids[i]);
            } else {
                stringBuilder.append(ids[i]).append(",");
            }
        }
        stringBuilder.append("&apiKey=").append(apiKey);
        getCall(stringBuilder.toString());

        for (Recipe r : recipes) {
            System.out.println(r);
        }
    }

    private void getCall(String query) {
        try {
            httpClient = HttpClients.createDefault();
            httpGet = new HttpGet(query);

            response = httpClient.execute(httpGet);
            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                try {
                    reader = new InputStreamReader(data);

                    recipes = json.fromJson(reader, Recipe[].class);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                //TODO: fixa felhantering
                System.out.println("Det sket sig!");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
