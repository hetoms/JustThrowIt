package classes.controller;

import classes.database.FieldRepository;
import classes.database.PersonRepository;
import classes.objects.*;
import classes.response.LoginResponse;
import classes.response.RequestResponse;
import com.sun.org.apache.regexp.internal.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {
    @Autowired
    private final PersonRepository personRepository;

    @Autowired
    private final FieldRepository fieldRepository;

    public Controller(PersonRepository personRepository, FieldRepository fieldRepository) {
        this.personRepository = personRepository;
        this.fieldRepository = fieldRepository;
    }

    @ResponseBody
    @RequestMapping(value = "/counties")
    public List<County> getCounties() {
        return new ArrayList<>(Arrays.asList(County.values()));
    }

    @ResponseBody
    @PostMapping("/register")
    // @RequestMapping(method = RequestMethod.POST)
    public RequestResponse registerAccount(@RequestBody PersonGet initialPerson) {
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

    @RequestMapping("/auth/login")
    @ResponseBody
    public LoginResponse getLoginRensponse(@RequestParam("username") String username) {
        List<Person> findings = personRepository.find(username);
        if (findings.isEmpty()) {
            return new LoginResponse(false);
        } else {
            LoginResponse loginResponse = new LoginResponse(true);
            loginResponse.setHashedPassword(findings.get(0).getPassword());
            return loginResponse;
        }
    }

    @RequestMapping(value = "/userData")
    @ResponseBody
    public Object getUserData(@RequestParam("username") String username) {
        List<Person> findings = personRepository.find(username);
        if (findings.isEmpty()) {
            return new LoginResponse(false);
        } else {
            return findings.get(0);
        }
    }

    @ResponseBody
    @PostMapping("/userHistory")
    public RequestResponse postSaveHistory(@RequestBody SavedGameGet savedGame) {
        try {
            List<Person> findings = personRepository.find(savedGame.getUsername());
            Person person = findings.get(0);
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            person.addSavedGame(new SavedGame(savedGame.getFieldId(), savedGame.getData(), new java.text.SimpleDateFormat("MM/dd/yyyy").format(timestamp.getTime()),savedGame.getUsername()));
            personRepository.save(person);
        } catch (IndexOutOfBoundsException e) {
            return new RequestResponse(false,"No such user found, please register.");
        } catch (ConstraintViolationException e) {
            return new RequestResponse(false,"Not enough fields.");
        }
        return new RequestResponse(true,"Passed");
    }

    @ResponseBody
    @RequestMapping("/userHistory")
    // @RequestMapping(method = RequestMethod.POST)
    public List<SavedGame> getSaveHistory(@RequestParam("username") String username) {
        List<Person> findings;
        try {
            findings = personRepository.find(username);
        } catch (IndexOutOfBoundsException e) {
            return new ArrayList<>();
        }
        return findings.get(0).getSavedGameList();
    }
}
