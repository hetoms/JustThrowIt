package classes.objects;

public class ScorePost {
    private String username;

    private int trackNr;

    private int score;

    private boolean hasFinished;

    private int lobbyKey;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getTrackNr() {
        return trackNr;
    }

    public void setTrackNr(int trackNr) {
        this.trackNr = trackNr;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public boolean isHasFinished() {
        return hasFinished;
    }

    public void setHasFinished(boolean hasFinished) {
        this.hasFinished = hasFinished;
    }

    public int getLobbyKey() {
        return lobbyKey;
    }

    public void setLobbyKey(int lobbyKey) {
        this.lobbyKey = lobbyKey;
    }
}
