package foodify.beans.spotify;

public class UserPLayList {
    private String id;
    private String mood;
    private String tempo;
    private String cuisine;

    public void setMood(String mood) {
        this.mood = mood;
    }

    public void setTempo(double tempoValue) {
        String tempoLabel = null;
        int tempo = (int) (tempoValue);
        tempoLabel = switch ((tempo >= 0 && tempo <= 33) ? 0 :
                (tempo >= 34 && tempo <= 66) ? 1 :
                        (tempo >= 67 && tempo <= 100) ? 2 : 3) {
            case 0 -> "Relaxed";
            case 1 -> "Upbeat";
            case 2 -> "Energetic";
            default -> "Unknown tempo";
        };

        this.tempo = tempoLabel;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getId() {
        return id;
    }
}
