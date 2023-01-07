package foodify.beans.spotify;

public class GetResult {
    private String id;
    private String name;
    private PlaylistTracks tracks;

    public Track[] getTracks() {
        return tracks.getTracks();
    }

    private class PlaylistTracks {
        private PlaylistItems[] items;

        public Track[] getTracks() {
            Track[] tracks = new Track[items.length];
            for (int i = 0; i < tracks.length; i++) {
                tracks[i] = items[i].getTrack();
            }

            return tracks;
        }

        private class PlaylistItems {
            private Track track;

            public Track getTrack() {
                return track;
            }
        }
    }
}
