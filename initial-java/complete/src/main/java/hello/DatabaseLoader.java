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

        Fields fields1 = new Fields("Aegviidu", 9, 59.2885344, 25.6033856, 27);
        for (int i = 1; i <= 9; i++) {
            fields1.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields1);


        Fields fields2 = new Fields("Alatskivi", 10, 58.603761, 27.129374, 30);
        for (int i = 1; i <= 10; i++) {
            fields2.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields2);


        Fields fields3 = new Fields("Alutaguse", 18, 59.291856, 27.4909369, 62);
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


        Fields fields4 = new Fields("Annikoru", 18, 58.2644297, 26.307959, 59);
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


        Fields fields5 = new Fields("Aravete", 18, 59.1430484, 25.7543671, 54);
        for (int i = 1; i <= 18; i++) {
            fields5.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields5);


        Fields fields6 = new Fields("Are Mõisapark", 9, 58.5294162, 24.5839262, 27);
        for (int i = 1; i <= 9; i++) {
            fields6.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields6);


        Fields fields7 = new Fields("Avinurme", 9, 58.9851993, 26.8698442, 27);
        for (int i = 1; i <= 9; i++) {
            fields7.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields7);


        Fields fields8 = new Fields("Edise", 9, 59.3653781, 27.376896, 28);
        for (int i = 1; i <= 9; i++) {
            if (i == 8) {
                fields8.addTrack(new Track(i, 4));
            } else {
                fields8.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields8);


        Fields fields9 = new Fields("Haanja", 18, 57.7224345, 27.0489407, 56);
        for (int i = 1; i <= 18; i++) {
            if (i == 4 || i == 10) {
                fields9.addTrack(new Track(i, 4));
            } else {
                fields9.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields9);


        Fields fields10 = new Fields("Holstre-Polli", 17, 59.1430484, 25.7543671, 52);
        for (int i = 1; i <= 17; i++) {
            if (i == 4) {
                fields10.addTrack(new Track(i, 4));
            } else {
                fields10.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields10);


        Fields fields11 = new Fields("Illuka mõisapark", 9, 59.237025, 27.4946406, 28);
        for (int i = 1; i <= 9; i++) {
            if (i == 6) {
                fields11.addTrack(new Track(i, 4));
            } else {
                fields11.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields11);


        Fields fields12 = new Fields("Jõgeva", 9, 58.7447, 26.3782945, 27);
        for (int i = 1; i <= 9; i++) {
            fields12.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields12);


        Fields fields13 = new Fields("Jõulumäe (Kollane)", 27, 58.2232688, 24.5168685, 86);
        for (int i = 1; i <= 27; i++) {
            if (i == 17) {
                fields13.addTrack(new Track(i, 4));
            } else if (i == 6 || i == 12) {
                fields13.addTrack(new Track(i, 5));
            } else {
                fields13.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields13);


        Fields fields14 = new Fields("Jõulumäe (Punane)", 18, 58.2234466, 24.5149451, 63);
        for (int i = 1; i <= 18; i++) {
            if (i == 4 || i == 6 || i == 8 || i == 10 || i == 13 || i == 17 || i == 18) {
                fields14.addTrack(new Track(i, 4));
            } else if (i == 12) {
                fields14.addTrack(new Track(i, 5));
            } else {
                fields14.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields14);


        Fields fields15 = new Fields("Jõulumäe (Sinine)", 9, 58.223627, 24.515734, 30);
        for (int i = 1; i <= 9; i++) {
            if (i == 6 || i == 5 || i == 9) {
                fields15.addTrack(new Track(i, 4));
            } else {
                fields15.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields15);


        Fields fields16 = new Fields("Järta)", 18, 58.8973513, 24.4731122, 54);
        for (int i = 1; i <= 18; i++) {
            fields16.addTrack(new Track(i, 3));
        }
        this.fieldRepository.save(fields16);


        Fields fields17 = new Fields("Järva-Jaani", 18, 59.0340848, 25.8943092, 58);
        for (int i = 1; i <= 18; i++) {
            if (i == 7 || i == 9 || i == 10 || i == 16) {
                fields17.addTrack(new Track(i, 4));
            } else {
                fields17.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields17);


        Fields fields18 = new Fields("Järvakandi", 18, 58.7752859, 24.8024945, 61);
        for (int i = 1; i <= 18; i++) {
            if (i == 1 || i == 3 || i == 4 || i == 5 || i == 11 || i == 13 || i == 14) {
                fields18.addTrack(new Track(i, 4));
            } else {
                fields18.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields18);


        Fields fields19 = new Fields("Järve talu", 18, 59.2537281, 24.2907071, 55);
        for (int i = 1; i <= 18; i++) {
            if (i == 18) {
                fields19.addTrack(new Track(i, 4));
            } else {
                fields19.addTrack(new Track(i, 3));
            }
        }
        this.fieldRepository.save(fields19);
    }
}
