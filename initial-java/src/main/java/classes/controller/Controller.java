package classes.controller;

import classes.objects.*;
import classes.response.LobbyResponse;
import classes.response.LoginResponse;
import classes.response.RequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    private ControllerService controllerService;

    @ResponseBody
    @RequestMapping(value = "/counties")
    public List<County> getCounties() {
        return new ArrayList<>(Arrays.asList(County.values()));
    }

    @ResponseBody
    @PostMapping("/register")
    // @RequestMapping(method = RequestMethod.POST)
    public RequestResponse registerAccount(@RequestBody PersonGet initialPerson) {
        return controllerService.registerAccount(initialPerson);
    }

    @RequestMapping("/auth/login")
    @ResponseBody
    public LoginResponse getLoginResponse(@RequestParam("username") String username) {
        return controllerService.loginResponse(username);
    }

    @RequestMapping(value = "/userData")
    @ResponseBody
    public Object getUserData(@RequestParam("username") String username) {
        return controllerService.findUserData(username);
    }

    @ResponseBody
    @PostMapping("/userHistory")
    public RequestResponse postSaveHistory(@RequestBody SavedGameGet savedGame) {
        return controllerService.saveGame(savedGame);
    }

    @ResponseBody
    @RequestMapping("/userHistory")
    // @RequestMapping(method = RequestMethod.POST)
    public List<SavedGame> getSaveHistory(@RequestParam("username") String username) {
        return controllerService.getSaveHistory(username);
    }

    @ResponseBody
    @PostMapping("/createLobby")
    // @RequestMapping(method = RequestMethod.POST)
    public LobbyResponse createLobby(@RequestBody CreateLobbyPost lobbyPost) {
        return controllerService.createLobby(lobbyPost);
    }

    @ResponseBody
    @RequestMapping("/join")
    // @RequestMapping(method = RequestMethod.POST)
    public LobbyResponse getLobby(@RequestParam("lobbyKey") int lobbyKey, @RequestParam("username") String username) {
        return controllerService.getLobby(lobbyKey, username);
    }

    @ResponseBody
    @RequestMapping("/postScore")
    // @RequestMapping(method = RequestMethod.POST)
    public LobbyResponse postScore(@RequestBody(required = false) ScorePost scorePost) {
        return controllerService.postScore(scorePost);
    }

    @ResponseBody
    @RequestMapping("/forceFinish")
    // @RequestMapping(method = RequestMethod.POST)
    public RequestResponse forceFinish(@RequestBody ForceFinishPost forceFinishPost) {
        return controllerService.forceFinish(forceFinishPost);
    }
}
