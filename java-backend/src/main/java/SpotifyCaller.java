import com.google.gson.Gson;
import foodify.beans.spotify.*;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;

import java.io.*;

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

    private String userId;
    private Playlist createdPlaylist;
    private double mood;

    public SpotifyCaller(String cuisine, double mood, String token, String userId) {
        // GET /search för att hämta en eller flera spellista/spellistor
        // GET /playlists/{playlist_id} för att hämta specifik spellista
        // Spara ner seed-värden (artist, låt, genre)
        // GET /recommendations för att generera låtar till nya spellistan
        // POST /users/{user_id}/playlists för att skapa en ny spellista
        // POST /playlists/{playlist_id}/tracks för att lägga till de genererade spåren
        // spela upp??
        this.userId = userId;
        this.mood = mood / 100;
        searchForItem(cuisine, token);

        /*
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

         */
    }

    private void searchForItem(String cuisine, String token) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/search?");
        stringBuilder.append("q=" + cuisine);
        stringBuilder.append("&type=playlist");
        stringBuilder.append("&limit=1");

        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(stringBuilder.toString());
        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + token);

        try {
            response = httpClient.execute(httpGet);
            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                try {
                    reader = new InputStreamReader(data);

                    Playlist playlist = json.fromJson(reader, Playlist.class);
                    getPlayList(playlist.getItems(), token, cuisine);
                } catch (Exception e) {
                    //TODO: fixa felhantering
                    e.printStackTrace();
                }
            } else {
                //TODO: riktig felhantering
                System.out.println("det sket sig");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    private void getPlayList(String playlistId, String token, String cuisine) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/playlists/" + playlistId);

        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(stringBuilder.toString());

        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + token);

        try {
            response = httpClient.execute(httpGet);

            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                try {
                    reader = new InputStreamReader(data);

                    Playlist seedList = json.fromJson(reader, Playlist.class);

                    createPlaylist(seedList, token, cuisine);
                } catch (Exception e) {
                    //TODO: lös felhantering
                    e.printStackTrace();
                }
            }
        } catch (IOException e) {
            //TODO: fixa felhantering
            e.printStackTrace();
        }
    }

    private void createPlaylist(Playlist seedList, String token, String cuisine) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/users/" + userId + "/playlists");

        httpClient = HttpClients.createDefault();
        httpPost = new HttpPost(stringBuilder.toString());

        httpPost.addHeader("Content-Type", "application/json");
        httpPost.addHeader("Authorization", "Bearer " + token);

        String inputJson = "{\"name\":\"My " + cuisine +  " playlist\"}";
        StringEntity stringEntity = null;
        try {
            stringEntity = new StringEntity(inputJson);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        httpPost.setEntity(stringEntity);

        try {
            response = httpClient.execute(httpPost);
            status = response.getStatusLine();

            if (status.getStatusCode() == 201) {
                reader = new InputStreamReader(data);

                createdPlaylist = json.fromJson(reader, Playlist.class);
                populatePlayList(seedList, token);
            } else {
                //TODO: felhantering!!
                System.out.println("Det blev ngt fel hehehe");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void populatePlayList(Playlist seedList, String token) {
        String[] seedURIs = getSeedURIs(seedList);

        String[] trackURIs = getTrackURIs(seedURIs, token);

        //TODO: fortsätt här nästa gång
    }


    private String[] getSeedURIs(Playlist seedList) {
        //PlaylistItems[] playlistItems = seedList.getTracks().getItems();
        Track[] tracks = seedList.getTracks().getItems()[0].getTracks();
        int spotifySeedLimit = 5;
        String[] seedURIs = new String[spotifySeedLimit];
        seedURIs[0] = tracks[0].getArtists()[0].getId();
        seedURIs[1] = tracks[1].getArtists()[0].getId();

        for (int i = 2; i < seedURIs.length; i++) {
            seedURIs[i] = tracks[i - 2].getId();
        }

        return seedURIs;
    }

    private String[] getTrackURIs(String[] seedURIs, String token) {
        int amountOfTracks = 10;
        String[] trackURIs = new String[amountOfTracks];

        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/recommendations?");
        stringBuilder.append("seed_artists=" + seedURIs[0] + "," + seedURIs[1]);
        stringBuilder.append("&seed_tracks=");
        for (int i = 2; i < seedURIs.length; i++) {
            if (i == seedURIs.length - 1) {
                stringBuilder.append(seedURIs[i]);
            }
            stringBuilder.append(seedURIs[i]).append(",");
        }
        stringBuilder.append("&target_danceability=" + mood);
        stringBuilder.append("&target_loudness=" + mood);
        stringBuilder.append("&target_energy=" + mood);
        stringBuilder.append("&target_valence=" + mood);

        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(stringBuilder.toString());
        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + token);

        Recommended recommended = null;
        try {
            response = httpClient.execute(httpGet);

            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                reader = new InputStreamReader(data);

                recommended = json.fromJson(reader, Recommended.class);
            } else {
                //TODO: felhantering
                System.out.println("ngt gick fel");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Track[] recommendedTracks = recommended.getTracks();
        for (int i = 0; i < trackURIs.length; i++) {
            trackURIs[i] = recommendedTracks[i].getId();
        }

        return trackURIs;
    }


}
