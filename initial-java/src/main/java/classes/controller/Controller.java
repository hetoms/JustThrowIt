package classes.controller;

import classes.database.FieldRepository;
import classes.database.PersonRepository;
import classes.objects.*;
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
}
