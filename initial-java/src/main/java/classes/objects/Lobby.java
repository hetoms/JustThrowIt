package classes.objects;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Lobby {

    public Lobby() {}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToMany(cascade = {CascadeType.ALL})
    @ElementCollection(targetClass= GameState.class)
    private List<GameState> gameState;

    private String creator;

    @OneToOne(cascade = {CascadeType.ALL})
    private Fields fields;

    @Column
    @ElementCollection(targetClass= String.class)
    private List<String> userNames = new ArrayList<>();

    public Lobby(String username, List<GameState> gameState, Fields fields) {
        this.creator = username;
        this.gameState = gameState;
        this.fields = fields;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public List<String> getUsernames() {
        return userNames;
    }

    public void setUsernames(List<String> usernames) {
        this.userNames = usernames;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<GameState> getGameState() {
        return gameState;
    }

    public void setGameState(List<GameState> gameState) {
        this.gameState = gameState;
    }

    public String getCreator() {
        return this.creator;
    }

    public void addGameState(GameState gameState) {
        this.gameState.add(gameState);
    }

    public Fields getFields() {
        return fields;
    }

    public void setFields(Fields fields) {
        this.fields = fields;
    }
}
