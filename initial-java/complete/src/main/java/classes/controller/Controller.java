package classes.controller;

import classes.database.FieldRepository;
import classes.database.PersonRepository;
import classes.objects.InitialPerson;
import classes.objects.Person;
import classes.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

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
    public List<String> getCounties() {
        List<String> countyList = Arrays.asList("pärnu", "tartu", "idaviru", "jõgeva", "võru", "harju", "viljandi",
                "põlva", "saare", "lääneviru", "hiiu", "valga", "lääne", "rapla", "järva");
        return countyList;
    }

    @ResponseBody
    @PostMapping("/register")
    // @RequestMapping(method = RequestMethod.POST)
    public Boolean registerAccount(@RequestBody InitialPerson initialPerson) {
        try {
            personRepository.save(new Person(initialPerson.getUsername(), initialPerson.getFullname(), initialPerson.getEmail(),
                    initialPerson.getHashedPassword()));
        } catch (DataIntegrityViolationException e) {
            return false;
        }
        return true;
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
}
