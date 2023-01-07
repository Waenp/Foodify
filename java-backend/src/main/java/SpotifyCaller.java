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
    private UserPLayList createdPlaylist;
    private double mood;
    private String dish;

    public SpotifyCaller(String dish, String cuisine, double mood, String token, String userId) {
        // GET /search för att hämta en eller flera spellista/spellistor
        // GET /playlists/{playlist_id} för att hämta specifik spellista
        // Spara ner seed-värden (artist, låt, genre)
        // GET /recommendations för att generera låtar till nya spellistan
        // POST /users/{user_id}/playlists för att skapa en ny spellista
        // POST /playlists/{playlist_id}/tracks för att lägga till de genererade spåren
        // spela upp??
        this.dish = dish;
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
        stringBuilder.append("q=").append(cuisine);
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

                    //Playlist playlist = json.fromJson(reader, Playlist.class);
                    SearchResult searchResult = json.fromJson(reader, SearchResult.class);
                    //getPlayList(playlist.getItems(), token, cuisine);
                    getPlayList(searchResult.getPlaylists().getId(), token, cuisine);
                } catch (Exception e) {
                    //TODO: fixa felhantering
                    e.printStackTrace();
                }
            } else {
                //TODO: riktig felhantering
                System.out.println("Failed at search for item");
                System.out.println("Reason: " + status.getReasonPhrase());
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

                    //Playlist seedList = json.fromJson(reader, Playlist.class);
                    GetResult seedList = json.fromJson(reader, GetResult.class);

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

    private void createPlaylist(GetResult seedList, String token, String cuisine) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/users/" + userId + "/playlists");

        httpClient = HttpClients.createDefault();
        httpPost = new HttpPost(stringBuilder.toString());

        httpPost.addHeader("Content-Type", "application/json");
        httpPost.addHeader("Authorization", "Bearer " + token);

        String inputJson = "{\"name\":\"" + generatePlaylistName() +  "\"}";
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
                entity = response.getEntity();
                data = entity.getContent();
                reader = new InputStreamReader(data);

                createdPlaylist = json.fromJson(reader, UserPLayList.class);
                System.out.println(createdPlaylist.getId());
                populatePlayList(seedList, token);
            } else {
                //TODO: felhantering!!
                System.out.println("Failed at creating playlist " + status.getStatusCode());
                System.out.println("Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generatePlaylistName() {
        return String.format("%s - %s", getMoodLabel(), dish);
    }

    private String getMoodLabel() {
        String moodLabel = null;
        int mood = (int) (this.mood * 100);
        System.out.println(mood);
        moodLabel = switch ((mood >= 0 && mood <= 33) ? 0 :
                (mood >= 34 && mood <= 66) ? 1 :
                        (mood >= 67 && mood <= 100) ? 2 : 3) {
            case 0 -> "Romantic";
            case 1 -> "Casual";
            case 2 -> "Party";
            default -> "Unknown mood";
        };

        return moodLabel;
    }

    private void populatePlayList(GetResult seedList, String token) {
        String[] seedURIs = getSeedURIs(seedList);

        String[] trackURIs = getTrackURIs(seedURIs, token);

        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/playlists/" + createdPlaylist.getId() + "/tracks?");
        stringBuilder.append("uris=");
        for (int i = 0; i < trackURIs.length; i++) {
            if (i == trackURIs.length - 1) {
                stringBuilder.append(trackURIs[i]);
            } else {
                stringBuilder.append(trackURIs[i]).append(",");
            }
        }

        httpClient = HttpClients.createDefault();
        httpPost = new HttpPost(stringBuilder.toString());
        httpPost.addHeader("Content-Type", "application/json");
        httpPost.addHeader("Authorization", "Bearer " + token);

        try {
            httpClient.execute(httpPost);
            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                System.out.println("Successfully added tracks to playlist");
            } else {
                System.out.println("Failed at adding tracks to playlist. Status code: " + status.getStatusCode());
                System.out.println("Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //TODO: ska vi spela upp??

    }


    private String[] getSeedURIs(GetResult seedList) {
        Track[] tracks = seedList.getTracks();

        int spotifySeedLimit = 5;
        String[] seedURIs = new String[spotifySeedLimit];
        seedURIs[0] = tracks[0].getArtists()[0].getId();
        System.out.println("First artist uri:" + seedURIs[0]);
        seedURIs[1] = tracks[1].getArtists()[0].getId();
        System.out.println("second artist uri:" + seedURIs[1]);

        for (int i = 2; i < seedURIs.length; i++) {
            seedURIs[i] = tracks[i - 2].getId();
            System.out.println("track id no " + (i - 1) + ": " + seedURIs[i]);
        }

        for (String s : seedURIs) {
            System.out.println(s);
        }

        return seedURIs;
    }

    private String[] getTrackURIs(String[] seedURIs, String token) {
        int amountOfTracks = 10;
        String[] trackURIs = new String[amountOfTracks];

        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/recommendations?");
        stringBuilder.append("limit=").append(amountOfTracks);
        stringBuilder.append("&seed_artists=").append(seedURIs[0]).append(",").append(seedURIs[1]);
        stringBuilder.append("&seed_tracks=");
        for (int i = 2; i < seedURIs.length; i++) {
            if (i == seedURIs.length - 1) {
                stringBuilder.append(seedURIs[i]);
            } else {
                stringBuilder.append(seedURIs[i]).append(",");
            }
        }

        stringBuilder.append("&target_danceability=").append(mood);
        stringBuilder.append("&target_loudness=").append(mood);
        stringBuilder.append("&target_energy=").append(mood);
        stringBuilder.append("&target_valence=").append(mood);



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
                System.out.println("Failed at getting recommendations. Statuscode: " + status.getStatusCode());
                System.out.println("Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Track[] recommendedTracks = recommended.getTracks();
        for (int i = 0; i < trackURIs.length; i++) {
            trackURIs[i] = recommendedTracks[i].getUri();
        }

        return trackURIs;
    }


}
