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

    private long fieldId;

    private String owner;

    @OneToMany(cascade = {CascadeType.ALL})
    @ElementCollection(targetClass= GameState.class)
    private List<GameState> gameState = new ArrayList<>();

    public LobbyResponse(String owner, Boolean success, int lobbyKey, List<GameState> gameState, long fieldId) {
        this.owner = owner;
        this.fieldId = fieldId;
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

    public long getFieldId() {
        return fieldId;
    }

    public void setFieldId(long fieldId) {
        this.fieldId = fieldId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
