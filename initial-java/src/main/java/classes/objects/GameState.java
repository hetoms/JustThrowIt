package classes.objects;

import javax.persistence.*;
import java.util.List;

@Entity
public class GameState {

    public GameState() {}

    public GameState(String playername, String score, boolean hasFinished){
        this.playername = playername;
        this.score = score;
        this.hasFinished = hasFinished;
    }

    private boolean hasFinished = false;

    @Id
    @GeneratedValue
    private Long gameStateId;

    @Column
    private String playername;

    private String score;

    public String getPlayername() {
        return playername;
    }

    public void setPlayername(String playername) {
        this.playername = playername;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public boolean isHasFinished() {
        return hasFinished;
    }

    public void setHasFinished(boolean hasFinished) {
        this.hasFinished = hasFinished;
    }
}
