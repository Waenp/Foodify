package foodify.beans.spotify;

public class Track {
    private Album album;
    private Artist[] artists;
    private String id;

    public Album getAlbum() {
        return album;
    }

    public Artist[] getArtists() {
        return artists;
    }

    public String getId() {
        return id;
    }
}
