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

/**
 * Provides communication with the Spotify API the class is provided with a token and a set of variables to control
 * the creation and population of Spotify playlists.
 */
public class SpotifyCaller {
    private HttpClient httpClient;
    private HttpGet httpGet;
    private HttpPost httpPost;
    private HttpResponse response;
    private StatusLine status;
    private HttpEntity entity;

    private InputStream data;
    private Reader reader;
    private final Gson json = new Gson();

    private User currentUser;

    private String accessToken;
    private UserPLayList createdPlaylist;
    private double mood;
    private double tempo;
    private String dish;
    private String cuisine;

    public SpotifyCaller() {

    }

    public void authorize(String accessToken) {
        this.accessToken = accessToken;

        String url = "https://api.spotify.com/v1/me";
        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(url);
        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + accessToken);

        try {
            response = httpClient.execute(httpGet);
            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                reader = new InputStreamReader(data);
                currentUser = json.fromJson(reader, User.class);
            } else {
                System.out.println("Failed at getting user information");
                System.out.println("Status code: " + status.getStatusCode() + ". Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void searchForItem(String dish, String cuisine, double mood, double tempo) {
        this.dish = dish.substring(0,1).toUpperCase() + dish.substring(1).toLowerCase();
        this.cuisine = cuisine.substring(0,1).toUpperCase() + cuisine.substring(1).toLowerCase();
        this.mood = mood / 100;
        this.tempo = tempo;

        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/search?");
        stringBuilder.append("q=").append(cuisine);
        stringBuilder.append("&type=playlist");
        stringBuilder.append("&limit=1");

        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(stringBuilder.toString());
        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + accessToken);

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
                    getPlayList(searchResult.getPlaylists().getId());
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



    /**
     * The constructor is provided a set of variables upon creation which are used to identify who the playlist is
     * created for, what kind of playlist it should be and a token to make requests to the Spotify API
     * @param dish the type of dish being prepared.
     * @param cuisine a type of cuisine to identify what kind of music should be generated (ex. Italian)
     * @param mood to identify what kind of mood the playlist should have, a value of 0-1 is set.
     * @param token a Spotify API token.
     * @param userId The current users spotify id (ex. tatrianelephant), it is the actual visible id to other users.
     */

    public SpotifyCaller(String dish, String cuisine, double mood, String token, String userId) {
        // GET /search för att hämta en eller flera spellista/spellistor
        // GET /playlists/{playlist_id} för att hämta specifik spellista
        // Spara ner seed-värden (artist, låt, genre)
        // GET /recommendations för att generera låtar till nya spellistan
        // POST /users/{user_id}/playlists för att skapa en ny spellista
        // POST /playlists/{playlist_id}/tracks för att lägga till de genererade spåren
        // spela upp??
        this.dish = dish;
        //this.userId = userId;
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


    /**
     * This method generates a single playlist which is used to create seed values for a complete playlist based on what
     * the user is cooking. It does this by taking a type of cuisine and searching for that cuisine using the
     * Spotify-API /search, together with the logged-in users token.
     * @param cuisine a single cuisine type (ex Italian).
     * @param token a user generated API-token.
     */
    private void searchForItem(String cuisine, String token) {
        /*
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



         */
    }

    /**
     * This method is used to get a generated playlist from the Spotify-API /playlist using the generated playlist id
     * from searchForItem() together with the token.
     * @param playlistId the id of a generated playlist.
     */
    private void getPlayList(String playlistId) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/playlists/" + playlistId);

        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(stringBuilder.toString());

        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + accessToken);

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

                    createPlaylist(seedList);
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

    /**
     * This method creates a customized playlist for the user based on their Spotify id and a generated custom name for
     * the playlist.
     * @param seedList a list of seed values which will be used to populate the newly created playlist.
     */
    private void createPlaylist(GetResult seedList) {
        StringBuilder stringBuilder = new StringBuilder("https://api.spotify.com/v1/users/" + currentUser.getId() + "/playlists");

        httpClient = HttpClients.createDefault();
        httpPost = new HttpPost(stringBuilder.toString());

        httpPost.addHeader("Content-Type", "application/json");
        httpPost.addHeader("Authorization", "Bearer " + accessToken);

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
                createdPlaylist.setCuisine(cuisine);
                createdPlaylist.setMood(getMoodLabel());
                createdPlaylist.setTempo(tempo);
                populatePlayList(seedList);
            } else {
                //TODO: felhantering!!
                System.out.println("Failed at creating playlist " + status.getStatusCode());
                System.out.println("Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method generates a playlist name based on the mood of the user and the dish name.
     * @return a customized playlist name.
     */
    private String generatePlaylistName() {
        return String.format("%s - %s", getMoodLabel(), dish);
    }

    /**
     * This method fetches the current mood of the user which they defined on the Foodify page.
     * @return returns a type of mood.
     */
    private String getMoodLabel() {
        String moodLabel = null;
        int mood = (int) (this.mood * 100);
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

    /**
     * This method populates the newly created user playlist with seed values of artists and tracks by calling the
     * Spotify-API /playlist/id/tracks?uris=.
     * @param seedList a list of artists and track ids.
     */
    private void populatePlayList(GetResult seedList) {
        String[] seedURIs = getSeedURIs(seedList);

        String[] trackURIs = getTrackURIs(seedURIs);

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
        httpPost.addHeader("Authorization", "Bearer " + accessToken);

        try {
            httpClient.execute(httpPost);
            status = response.getStatusLine();

            if (status.getStatusCode() == 200) {
                System.out.println("Successfully added tracks to playlist");
                getImages();
            } else {
                System.out.println("Failed at adding tracks to playlist. Status code: " + status.getStatusCode());
                System.out.println("Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void getImages() {
        String url = "https://api.spotify.com/v1/playlists/" + createdPlaylist.getId();
        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(url);
        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + accessToken);

        try {
            response = httpClient.execute(httpGet);

            status = response.getStatusLine();
            if (status.getStatusCode() == 200) {
                entity = response.getEntity();
                data = entity.getContent();

                reader = new InputStreamReader(data);

                ImageResult images = json.fromJson(reader, ImageResult.class);

                createdPlaylist.setImages(images.getImages());
            } else {
                System.out.println("Failed at getting playlist");
                System.out.println("Status code: " + status.getStatusCode() + " . Reason: " + status.getReasonPhrase());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * This method is used for taking objects of GetResult fetching either artist ids and adding them to a
     * String array.
     * @param seedList a list of artists and track ids.
     * @return an array of ids.
     */
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

    /**
     * This method uses the extrapolated seed uris to generate 10 tracks to add to the users playlist by calling the
     * Spotify API /recommendations.
     * @param seedURIs an array of seed URIs.
     * @return an array of recommended track URIs.
     */
    private String[] getTrackURIs(String[] seedURIs) {
        int amountOfTracks = 10;


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
        stringBuilder.append("&target_tempo=").append(calculateTempo(tempo));



        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(stringBuilder.toString());
        httpGet.addHeader("Content-Type", "application/json");
        httpGet.addHeader("Authorization", "Bearer " + accessToken);

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
        String[] trackURIs = new String[recommendedTracks.length];
        for (int i = 0; i < trackURIs.length; i++) {
            trackURIs[i] = recommendedTracks[i].getUri();
        }

        return trackURIs;
    }

    private String calculateTempo(double tempo) {
        double oldValue = tempo;
        double oldMin = 0;
        double oldMax = 100;
        double newMin = 70;
        double newMax = 220;

        double newValue = ((oldValue - oldMin) / (oldMax - oldMin) ) * (newMax - newMin) + newMin;
        System.out.println("Calculated tempo: " + newValue);
        return String.valueOf(newValue);
    }

    public UserPLayList getCreatedPlaylist() {
        return createdPlaylist;
    }
}
