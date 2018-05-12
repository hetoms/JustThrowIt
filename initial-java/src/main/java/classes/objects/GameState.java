package classes.objects;

import javax.persistence.*;
import java.util.List;

@Entity
public class GameState {

    public GameState() {}

    public GameState(String playername, List<Integer> score, boolean hasFinished){
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

    @ElementCollection(targetClass= Integer.class)
    private List<Integer> score;

    public String getPlayername() {
        return playername;
    }

    public void setPlayername(String playername) {
        this.playername = playername;
    }

    public List<Integer> getScore() {
        return score;
    }

    public void setScore(List<Integer> score) {
        this.score = score;
    }

    public boolean isHasFinished() {
        return hasFinished;
    }

    public void setHasFinished(boolean hasFinished) {
        this.hasFinished = hasFinished;
    }
}
