package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private final FieldRepository fieldRepository;

    @Autowired
    public DatabaseLoader(FieldRepository personRepository) {
        this.fieldRepository = personRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        fieldRepository.deleteAll();
        Fields fields1 = new Fields("Aegviidu", 9, 59.2885344, 25.6033856);
        for (int i = 1; i <= 9; i++) {
            fields1.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields1);

        Fields fields2 = new Fields("Alatskivi", 10, 58.603761, 27.129374);
        for (int i = 1; i <= 10; i++) {
            fields2.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields2);

        Fields fields3 = new Fields("Alutaguse", 18, 59.291856, 27.4909369);
        fields3.addTrack(new Track(1, 3));
        fields3.addTrack(new Track(2, 4));
        fields3.addTrack(new Track(3, 4));
        fields3.addTrack(new Track(4, 3));
        fields3.addTrack(new Track(5, 3));
        fields3.addTrack(new Track(6, 4));
        fields3.addTrack(new Track(7, 3));
        fields3.addTrack(new Track(8, 4));
        fields3.addTrack(new Track(9, 5));
        fields3.addTrack(new Track(10, 3));
        fields3.addTrack(new Track(11, 3));
        fields3.addTrack(new Track(12, 4));
        fields3.addTrack(new Track(13, 4));
        fields3.addTrack(new Track(14, 3));
        fields3.addTrack(new Track(15, 3));
        fields3.addTrack(new Track(16, 3));
        fields3.addTrack(new Track(17, 3));
        fields3.addTrack(new Track(18, 3));
        this.fieldRepository.save(fields3);

        Fields fields4 = new Fields("Annikoru", 18, 58.2644297, 26.307959);
        fields4.addTrack(new Track(1, 3));
        fields4.addTrack(new Track(2, 3));
        fields4.addTrack(new Track(3, 4));
        fields4.addTrack(new Track(4, 4));
        fields4.addTrack(new Track(5, 3));
        fields4.addTrack(new Track(6, 4));
        fields4.addTrack(new Track(7, 3));
        fields4.addTrack(new Track(8, 3));
        fields4.addTrack(new Track(9, 4));
        fields4.addTrack(new Track(10, 3));
        fields4.addTrack(new Track(11, 3));
        fields4.addTrack(new Track(12, 3));
        fields4.addTrack(new Track(13, 3));
        fields4.addTrack(new Track(14, 3));
        fields4.addTrack(new Track(15, 3));
        fields4.addTrack(new Track(16, 4));
        fields4.addTrack(new Track(17, 3));
        fields4.addTrack(new Track(18, 3));
        this.fieldRepository.save(fields4);

        Fields fields5 = new Fields("Aravete", 18, 59.1430484, 25.7543671);
        for (int i = 1; i <= 18; i++) {
            fields5.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields5);

        Fields fields6 = new Fields("Are Mõisapark", 9, 58.5294162, 24.5839262);
        for (int i = 1; i <= 9; i++) {
            fields6.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields6);

        Fields fields7 = new Fields("Avinurme", 9, 58.9851993, 26.8698442);
        for (int i = 1; i <= 9; i++) {
            fields7.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields7);
    }
}
