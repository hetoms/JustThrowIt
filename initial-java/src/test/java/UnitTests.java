
import classes.Application;
import classes.database.FieldRepository;
import classes.database.PersonRepository;
import classes.objects.Fields;
import classes.objects.Person;
import classes.objects.SavedGame;
import classes.objects.Track;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.PersistenceException;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest(classes = Application.class)
public class UnitTests {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private FieldRepository fieldRepository;

	private Fields fields;

	private Person mary;

	private Track track;

	private SavedGame savedGame;

	@Before
	public void setup() {
		this.savedGame = new SavedGame("id", "data", "date", "username");
		this.track = new Track(2, 3);
		this.mary = new Person("mary", "asda", "asd@awd.ee", "sdasd");
		this.fields = new Fields("tallinn", 4, 3, 2, 1);
		entityManager.persist(mary);
		entityManager.flush();
	}

	@Test
	public void whenFindByUserName_thenReturnPerson() {
		// given
		Person alex = new Person("alex", "asda", "asd@awd.ee", "sdasd");
		entityManager.persist(alex);
		entityManager.flush();
		// when
		List<Person> found = personRepository.find(alex.getUsername());
		// then
		assertThat(found.get(0))
				.isEqualTo(alex);
	}

	@Test(expected = PersistenceException.class)
	public void insertTwoSameUserNames_thenError() {
		// given
		Person secondMary = new Person("mary", "asda", "asd@awd.ee", "sdasd");
		entityManager.persist(secondMary);
		entityManager.flush();
		// when
		List<Person> found = personRepository.find(secondMary.getUsername());
		// then
		assertThat(found.get(0))
				.isEqualTo(secondMary);
	}

	@Test
	public void testFieldsInitialisationName() {
		assertThat(fields.getFieldName().equals("tallinn"));
	}

	@Test
	public void testFieldsInitialisationTracksNr() {
		assertEquals(4, fields.getNumberOfTracks(), 0);
	}

	@Test
	public void testFieldsInitialisationLatitude() {
		assertEquals(3, fields.getLatitude(), 0);
	}

	@Test
	public void testFieldsInitialisationLongitude() {
		assertEquals(2, fields.getLongitude(), 0);
	}

	@Test
	public void testFieldsInitialisationPar() {
		assertEquals(1, fields.getPars(), 0);
	}

	@Test
	public void testFieldsInitialisationSetCounty() {
		fields.setCounty("estonia");
		assertTrue(fields.getCounty().equals("estonia"));
	}

	@Test
	public void testFieldsInitialisationSetText() {
		fields.setText("text");
		assertTrue(fields.getText().equals("text"));
	}

	@Test
	public void whenFindByField_thenReturnField() {
		// given
		entityManager.persist(fields);
		entityManager.flush();
		// when
		List<Fields> fieldsList = (List<Fields>) fieldRepository.findAll();
		// then
		assertThat(fieldsList.get(0))
				.isEqualTo(fields);
	}

	@Test
	public void testPersonInitialisationUserName() {
		assertTrue(mary.getUsername().equals("mary"));
	}

	@Test
	public void testPersonInitialisationPw() {
		assertTrue(mary.getPassword().equals("sdasd"));
	}

	@Test
	public void testPersonInitialisationEmail() {
		assertTrue(mary.getEmail().equals("asd@awd.ee"));
	}

	@Test
	public void testPersonInitialisationFullName() {
		assertTrue(mary.getName().equals("asda"));
	}

	@Test
	public void testPersonInitialisationSetEmail() {
		mary.setEmail("idk");
		assertTrue(mary.getEmail().equals("idk"));
	}

	@Test
	public void testPersonInitialisationSetSavedGame() {
		List<SavedGame> savedGameList = new ArrayList<>();
		savedGameList.add(savedGame);
		mary.setSavedGameList(savedGameList);
		assertEquals(savedGame, mary.getSavedGameList().get(0));
	}

	@Test
	public void testFieldsAddTrack() {
		fields.addTrack(track);
		assertEquals(track, fields.getTracks().get(0));
	}

	@Test
	public void testTrackInitialisationTrackNr() {
		assertEquals(2, track.getTrackNumber());
	}

	@Test
	public void testTrackInitialisationTrackPar() {
		assertEquals(3, track.getTrackPar());
	}

	@Test
	public void testTrackInitialisationSetTrackNr() {
		track.setTrackNumber(5);
		assertEquals(5, track.getTrackNumber());
	}

	@Test
	public void testTrackInitialisationSetTrackOPar() {
		track.setTrackPar(6);
		assertEquals(6, track.getTrackPar());
	}

	@Test
	public void testSavedGameInitialisationId() {
		assertTrue(savedGame.getFieldId().equals("id"));
	}

	@Test
	public void testSavedGameInitialisationDate() {
		assertTrue(savedGame.getDate().equals("date"));
	}

	@Test
	public void testSavedGameInitialisationData() {
		assertTrue(savedGame.getData().equals("data"));
	}

	@Test
	public void testSavedGameInitialisationUsername() {
		assertTrue(savedGame.getUsername().equals("username"));
	}

}