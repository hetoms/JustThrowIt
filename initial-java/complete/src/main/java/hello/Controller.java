package hello;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {

    @ResponseBody
    @RequestMapping(value = "/counties")
    public List<String> getCounties() {
        List<String> countyList = Arrays.asList("pärnu", "tartu", "idaviru", "jõgeva", "võru", "harju", "viljandi",
                "põlva", "saare", "lääneviru", "hiiu", "valga", "lääne", "rapla", "järva");
        return countyList;
    }
}
