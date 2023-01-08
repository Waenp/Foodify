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

/**
 * Provides communication with the SpoonAcular api, the class is provided with a token and a comma seperated list of
 * ingredients which is used to generate recipes for the caller.
 */
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

    /**
     * The constructor takes a String value upon creation which it sets to the instance variable key. The instance
     * variable is used in several API-calls to SpoonAculars API.
     * @param key a String value containing an API-token.
     */
    public SpoonCaller(String key) {
        this.key = key;
    }

    /**
     * This method is for getting an array of the beans recipes upon calling.
     * @return an array containing recipes.
     */
    public Recipe[] getRecipes() {
        return recipes;
    }

    /**
     * This method is for getting a single specific recipe.
     * @param index TODO comment after deciding on index or food-id.
     * @return returns a single recipe from the array recipes.
     */
    public Recipe getRecipe(int index) {
        return recipes[index];
    }
    /**
     * TODO remove?
     * @param ingredients an array of strings, each index contains one ingredient.
     */
    public void generateRecipes(String[] ingredients) {
        searchByIngredients(ingredients);
    }

    /**
     * This method is for searching for recipes using the provided ingredients, when the method is called a uri is
     * built using:
     * - the token which was set as an instance variable on creation
     * - the ingredients from the parameter.
     * Once the uri is built the SpoonAcular API recipes/findByIngredients is called which is used to fetch recipes
     * matching the given ingredients and save them as an array of the Recipe class. Finally, the method
     * getInformationBulk is called.
     * @param ingredients an array of Strings containing ingredients.
     */
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
    /**
     * This method is for fetching bulk information of a given list of dish ids, when the method is called an uri is
     * built using:
     * - the token which was set as an instance variable on creation
     * - the ids from the parameter, which are used to identify what recepis to fetch.
     * Once the uri is built the SpoonAcular API recipes/informationBulk is called which is used to populate all
     * instance variables of the class Recipe. Should the recipe be missing what type of cuisine it is, the
     * method analysCuisine is called to generate cuisine types.
     * @param ids an array of Strings containing ids.
     */
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

    /**
     * This method is used when a recipe is missing its cuisine type. Since the Foodiy mashup needs a cuisine type in
     * order to generate a playlist to go with cooking this method generates missing cuisine types by building the
     * uri using:
     * - the token which was set as an instance variable on creation
     * - the recipe missing its cuisine type.
     * Once the uri is built the SpoonAcular API recipes/cuisine is called which requires a set of ingredients to
     * approximate a set of cuisine types and updates the recipe.
     * @param recipe a recipe object.
     */
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
