import com.google.gson.Gson;
import foodify.beans.Playlist;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class SpotifyCaller {
    private HttpClient httpClient;
    private HttpGet httpGet;
    private HttpPost httpPost;
    private HttpResponse response;
    private StatusLine status;
    private HttpEntity entity;

    private InputStream data;
    private Reader reader;
    private Gson json = new Gson();
    private Playlist playlist;

    public SpotifyCaller(String cuisine, double mood) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/search?");
        //TODO: ska mood vara string?
        stringBuilder.append("q=" + cuisine);
        stringBuilder.append("&type=playlist");
        stringBuilder.append("&limit=1");

        try {
            httpClient = HttpClients.createDefault();
            httpGet = new HttpGet(stringBuilder.toString());
            httpGet.addHeader("Accept", "application/json");
            httpGet.addHeader("Content-Type", "application/json");
            //TODO: fixa authorization...
            String authorization = "tjenare";
            httpGet.addHeader("Authorization", "Bearer " + authorization);

            response = httpClient.execute(httpGet);
            status = response.getStatusLine();
            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                try {
                    reader = new InputStreamReader(data);
                    playlist = json.fromJson(reader, Playlist.class);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                //TODO: kalla på metoder för att skapa seed-värden...
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
