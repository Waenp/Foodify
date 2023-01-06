package foodify.beans.spotify;

public class SearchResult {

    PlaylistResults playlists;

    public Playlist getPlaylists() {
        return playlists.getItem();
    }

    private class PlaylistResults {
        private Playlist[] items;

        public Playlist getItem() {
            return items[0];
        }
    }
}


