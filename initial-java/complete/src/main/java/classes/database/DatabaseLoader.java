package classes.database;

import classes.objects.Fields;
import classes.objects.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private final FieldRepository fieldRepository;

    @Autowired
    public DatabaseLoader(FieldRepository personRepository) {
        this.fieldRepository = personRepository;
    }

    @Autowired
    private ResourceLoader resourceLoader;

    @Override
    public void run(String... strings) throws Exception {
        this.fieldRepository.deleteAll();
        Resource resource  = resourceLoader.getResource("classpath:static/dataFile.txt");
        try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream(), "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] row = line.split("\\|");
                Fields fields = new Fields(row[0], Integer.parseInt(row[1]), Double.parseDouble(row[2]),
                        Double.parseDouble(row[3]), Integer.parseInt(row[4]));
                fields.setCounty(row[5]);
                fields.setText(row[6]);
                if (!row[7].equals("[]")) {
                    String[] parList = row[7].replace("[", "").replace("]", "")
                            .replace(" ", "").split(",");
                    for (int i = 0; i < parList.length; i++) {
                        if (!parList[i].equals("-")) {
                            fields.addTrack(new Track(i + 1, Integer.parseInt(parList[i])));
                        }
                    }
                }
                this.fieldRepository.save(fields);
            }
        }
    }
}
