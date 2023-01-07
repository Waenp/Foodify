import com.google.gson.Gson;
import foodify.beans.spoonacular.AnalyzedCuisine;
import foodify.beans.spoonacular.recipe.Ingredient;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import foodify.beans.spoonacular.recipe.Recipe;
import org.apache.http.message.BasicNameValuePair;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;


public class SpoonCaller {
    private final String key;
    private HttpClient httpClient;
    private HttpGet httpGet;
    private HttpPost httpPost;
    private HttpResponse response;
    private StatusLine status;
    private HttpEntity entity;
    private InputStream data;
    private Reader reader;
    private Gson json = new Gson();

    private Recipe[] recipes;

    public Recipe[] getRecipes() {
        return recipes;
    }

    public Recipe getRecipe(int index) {
        return recipes[index];
    }

    public SpoonCaller(String key) {
        this.key = key;
    }

    public void generateRecipes(String[] ingredients) {
        searchByIngredients(ingredients);
    }

    private void searchByIngredients(String[] ingredients) {
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
        stringBuilder.append("&apiKey=").append(key);

        //getCall(stringBuilder.toString());

        try {
            httpClient = HttpClients.createDefault();
            httpGet = new HttpGet(stringBuilder.toString());
            httpGet.addHeader("Content-Type", "application/json");

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
                System.out.println("Failed at searching by ingredients");
                System.out.println("Status code: " + status.getStatusCode() + ". Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        String[] ids = new String[recipes.length];
        for (int i = 0; i < recipes.length; i++) {
            ids[i] = recipes[i].getId();
        }

        getInformationBulk(ids);
    }

    private void getInformationBulk(String[] ids) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spoonacular.com/recipes/informationBulk?");
        stringBuilder.append("ids=");
        for (int i = 0; i < ids.length; i++) {
            if (i == ids.length - 1) {
                stringBuilder.append(ids[i]);
            } else {
                stringBuilder.append(ids[i]).append(",");
            }
        }
        stringBuilder.append("&apiKey=").append(key);

        try {
            httpClient = HttpClients.createDefault();
            httpGet = new HttpGet(stringBuilder.toString());
            httpGet.addHeader("Content-Type", "application/json");

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
                System.out.println("Failed at fetching recipe information");
                System.out.println("Status code: " + status.getStatusCode() + ". Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }


        for (Recipe r : recipes) {
            String[] cuisines = r.getCuisines();
            if (cuisines.length < 1) {
                analyzeCuisine(r);
            }
            System.out.println(r);
        }
    }

    private void analyzeCuisine(Recipe recipe) {
        StringBuilder url = new StringBuilder("https://api.spoonacular.com/recipes/cuisine?");
        url.append("language=en");
        url.append("&apiKey=").append(key);

        try {
            httpClient = HttpClients.createDefault();
            httpPost = new HttpPost(url.toString());
            httpPost.addHeader("Content-Type","application/json");

            List<NameValuePair> params = new ArrayList<>();
            params.add(new BasicNameValuePair("title", recipe.getTitle()));
            StringBuilder ingredientsBuilder = new StringBuilder();
            Ingredient[] ingredients = recipe.getExtendedIngredients();
            for (Ingredient i : ingredients) {
                ingredientsBuilder.append(i.getNameClean()).append("\n");
            }
            params.add(new BasicNameValuePair("ingredientList", ingredientsBuilder.toString()));

            httpPost.setEntity(new UrlEncodedFormEntity(params));
            response = httpClient.execute(httpPost);
            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                try {
                    reader = new InputStreamReader(data);

                    AnalyzedCuisine analyzedCuisine = json.fromJson(reader, AnalyzedCuisine.class);
                    recipe.setCuisines(analyzedCuisine.getCuisines());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                System.out.println("Failed at analyzing cuisine");
                System.out.println("Status code: " + status.getStatusCode() + ". Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
