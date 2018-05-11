package classes.response;

import classes.objects.GameState;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

public class LobbyResponse {

    private Boolean success;

    private int lobbyKey;

    @OneToMany(cascade = {CascadeType.ALL})
    @ElementCollection(targetClass= GameState.class)
    private List<GameState> gameState = new ArrayList<>();

    public LobbyResponse(Boolean success, int lobbyKey, List<GameState> gameState) {
        this.lobbyKey = lobbyKey;
        this.success = success;
        this.gameState = gameState;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public long getLobbyKey() {
        return lobbyKey;
    }

    public void setLobbyKey(int lobbyKey) {
        this.lobbyKey = lobbyKey;
    }

    public List<GameState> getGameState() {
        return gameState;
    }

    public void setGameState(List<GameState> gameState) {
        this.gameState = gameState;
    }
}
