package classes.controller;

import classes.database.FieldRepository;
import classes.database.LobbyRepository;
import classes.database.PersonRepository;
import classes.objects.*;
import classes.response.LobbyResponse;
import classes.response.LoginResponse;
import classes.response.RequestResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.sql.Timestamp;
import java.util.*;

@Service
public class ControllerService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private LobbyRepository lobbyRepository;

    public RequestResponse registerAccount(PersonGet initialPerson) {
        try {
            personRepository.save(new Person(initialPerson.getUsername(), initialPerson.getFullname(), initialPerson.getEmail(),
                    initialPerson.getHashedPassword()));
        } catch (DataIntegrityViolationException e) {
            return new RequestResponse(false,"Such user already exists.");
        }catch (ConstraintViolationException e) {
            return new RequestResponse(false,"Email not in valid format.");
        }
        return new RequestResponse(true, "Passed");
    }

    public LoginResponse loginResponse(String username) {
        List<Person> findings = personRepository.find(username);
        if (findings.isEmpty()) {
            return new LoginResponse(false);
        } else {
            LoginResponse loginResponse = new LoginResponse(true);
            loginResponse.setHashedPassword(findings.get(0).getPassword());
            return loginResponse;
        }
    }

    public Object findUserData(String username) {
        List<Person> findings = personRepository.find(username);
        if (findings.isEmpty()) {
            return new LoginResponse(false);
        } else {
            return findings.get(0);
        }
    }

    public RequestResponse saveGame(SavedGameGet savedGame){
        try {
            List<Person> findings = personRepository.find(savedGame.getUsername());
            Person person = findings.get(0);
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            if (savedGame.getData().equals("[]")) {
                throw new ConstraintViolationException(new HashSet<ConstraintViolation<?>>());
            }
            person.addSavedGame(new SavedGame(savedGame.getFieldId(), savedGame.getData(), new java.text.SimpleDateFormat("MM/dd/yyyy").format(timestamp.getTime()),savedGame.getUsername()));
            personRepository.save(person);
        } catch (IndexOutOfBoundsException e) {
            return new RequestResponse(false,"No such user found, please register.");
        } catch (ConstraintViolationException e) {
            return new RequestResponse(false,"Not enough fields.");
        }
        return new RequestResponse(true,"Passed");
    }

    public List<SavedGame> getSaveHistory(String username) {
        List<Person> findings;
        try {
            findings = personRepository.find(username);
        } catch (IndexOutOfBoundsException e) {
            return new ArrayList<>();
        }
        return findings.get(0).getSavedGameList();
    }

    public LobbyResponse createLobby(CreateLobbyPost lobbyPost) {
        List<Person> persons;
        Lobby lobby;
        try {
            persons = personRepository.find(lobbyPost.getUsername());
            Person person = persons.get(0);
            List<Fields> findings = fieldRepository.find(lobbyPost.getFieldId());
            Fields field = findings.get(0);
            GameState gameState = new GameState(person.getUsername(), new ArrayList<Integer>(Collections.nCopies(field.getNumberOfTracks(), 0)), false);
            List<GameState> gameStates = new ArrayList<>();
            gameStates.add(gameState);
            lobby = new Lobby(lobbyPost.getUsername(), gameStates, field);
            lobbyRepository.save(lobby);
        } catch (IndexOutOfBoundsException e) {
            return new LobbyResponse(null, false, 0, null, 0);
        }
        return new LobbyResponse(lobby.getCreator(), true, lobby.getId(), lobby.getGameState(), lobby.getFields().getFieldID());
    }

    public LobbyResponse getLobby(int lobbyId, String username) {
        Boolean exists = false;
        Lobby lobby;
        try {
            List<Lobby> lobbyList = lobbyRepository.find(lobbyId);
            lobby = lobbyList.get(0);
            for (int i = 0; i < lobby.getGameState().size(); i++) {
                if (lobby.getGameState().get(i).getPlayername().equals(username)) {
                    exists = true;
                }
            }
            if (!exists) {
                Fields fields = lobby.getFields();
                GameState gameState = new GameState(username, new ArrayList<Integer>(Collections.nCopies(fields.getNumberOfTracks(), 0)), false);
                lobby.addGameState(gameState);
                lobbyRepository.save(lobby);
            }
        } catch (IndexOutOfBoundsException e) {
            return new LobbyResponse(null,false, lobbyId, null, 0);
        }
        return new LobbyResponse(lobby.getCreator(),true, lobby.getId(), lobby.getGameState(), lobby.getFields().getFieldID());
    }

    public LobbyResponse postScore(ScorePost scorePost) {
        Lobby lobby;
        try {
            List<Lobby> lobbyList = lobbyRepository.find(scorePost.getLobbyKey());
            lobby = lobbyList.get(0);
            List<Integer> newScoreList = new ArrayList<>();
            for (int i = 0; i < lobby.getGameState().size(); i++) {
                if (lobby.getGameState().get(i).getPlayername().equalsIgnoreCase(scorePost.getUsername())) {
                    if (scorePost.isHasFinished()) {
                        lobby.getGameState().get(i).setHasFinished(true);
                        lobbyRepository.save(lobby);
                        int finishedPlayers = 0;
                        for (int o = 0; o < lobby.getGameState().size(); o++) {
                            if (lobby.getGameState().get(o).isHasFinished()) {
                                finishedPlayers += 1;
                            }
                        }
                        if (finishedPlayers == lobby.getGameState().size()) {
                            ObjectMapper mapper = new ObjectMapper();
                            ArrayNode arrayNode = mapper.createArrayNode();
                            for (int s = 0; s < lobby.getGameState().size(); s++) {
                                String playerName = lobby.getGameState().get(s).getPlayername();
                                ObjectNode objectNode = mapper.createObjectNode();
                                int totalThrows = 0;
                                List<Integer> score = lobby.getGameState().get(s).getScore();
                                for (int j = 0; j < score.size(); j++) {
                                    totalThrows += score.get(j);
                                }
                                objectNode.put("playerName", playerName);
                                objectNode.put("throws", totalThrows);
                                arrayNode.add(objectNode);
                            }
                            for (int player = 0; player < lobby.getGameState().size(); player++) {
                                SavedGameGet savedGameGet = new SavedGameGet();
                                savedGameGet.setFieldId(lobby.getFields().getFieldID());
                                savedGameGet.setUsername(lobby.getGameState().get(player).getPlayername());
                                savedGameGet.setData(arrayNode.toString());
                                saveGame(savedGameGet);
                            }
                            lobbyRepository.delete(lobby);
                        }
                        break;
                    } else {
                        newScoreList = lobby.getGameState().get(i).getScore();
                        newScoreList.set(scorePost.getTrackNr() - 1, scorePost.getScore());
                        lobby.getGameState().get(i).setScore(newScoreList);
                        lobbyRepository.save(lobby);
                    }
                    break;
                }
            }
        } catch (IndexOutOfBoundsException e) {
            return new LobbyResponse(null, false, scorePost.getLobbyKey(), null, 0);
        }
        return new LobbyResponse(lobby.getCreator(), true, lobby.getId(), lobby.getGameState(), lobby.getFields().getFieldID());
    }

    public RequestResponse forceFinish(ForceFinishPost forceFinishPost) {
        Lobby lobby;
        try {
            List<Lobby> lobbyList = lobbyRepository.find(forceFinishPost.getLobbyKey());
            lobby = lobbyList.get(0);
            if (forceFinishPost.getUsername().equals(lobby.getCreator())) {
                for (int i = 0; i < lobby.getGameState().size(); i++) {
                    lobby.getGameState().get(i).setHasFinished(true);
                }
                ObjectMapper mapper = new ObjectMapper();
                ArrayNode arrayNode = mapper.createArrayNode();
                for (int s = 0; s < lobby.getGameState().size(); s++) {
                    String playerName = lobby.getGameState().get(s).getPlayername();
                    ObjectNode objectNode = mapper.createObjectNode();
                    int totalThrows = 0;
                    List<Integer> score = lobby.getGameState().get(s).getScore();
                    for (int j = 0; j < score.size(); j++) {
                        totalThrows += score.get(j);
                    }
                    objectNode.put("playerName", playerName);
                    objectNode.put("throws", totalThrows);
                    arrayNode.add(objectNode);
                }
                for (int player = 0; player < lobby.getGameState().size(); player++) {
                    SavedGameGet savedGameGet = new SavedGameGet();
                    savedGameGet.setFieldId(lobby.getFields().getFieldID());
                    savedGameGet.setUsername(lobby.getGameState().get(player).getPlayername());
                    savedGameGet.setData(arrayNode.toString());
                    saveGame(savedGameGet);
                }
                lobbyRepository.delete(lobby);
            } else {
                return new RequestResponse(false, "You are not the lobby owner.");
            }
        } catch (IndexOutOfBoundsException e) {
            return new RequestResponse(false, "Couldn't find the lobby.");
        }
        return new RequestResponse(true, "Saved game successfully.");
    }
}
