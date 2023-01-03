package foodify.beans.spotify;

public class Playlist {
    private Item[] items;
    private PlaylistTracks tracks;

    public String getItems() {
        return items[0].getId();
    }

    public PlaylistTracks getTracks() {
        return tracks;
    }
}
