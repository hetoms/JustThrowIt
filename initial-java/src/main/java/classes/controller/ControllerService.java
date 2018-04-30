package classes.controller;

import classes.database.PersonRepository;
import classes.objects.Person;
import classes.objects.PersonGet;
import classes.objects.SavedGame;
import classes.objects.SavedGameGet;
import classes.response.LoginResponse;
import classes.response.RequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class ControllerService {

    @Autowired
    private PersonRepository personRepository;

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

    public RequestResponse saveGame(SavedGameGet savedGame) {
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

    public List<SavedGame> getSaveHistory(String username) {
        List<Person> findings;
        try {
            findings = personRepository.find(username);
        } catch (IndexOutOfBoundsException e) {
            return new ArrayList<>();
        }
        return findings.get(0).getSavedGameList();
    }
}
