package classes.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Email;
import org.springframework.data.annotation.Transient;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Person {

	@OneToMany(cascade = {CascadeType.ALL})

	@ElementCollection(targetClass=SavedGame.class)

	private List<SavedGame> savedGameList = new ArrayList<>();

	@Column(unique = true)
	private String userName;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column
	private String fullName;

	@Column
	@Transient
	private String password;

	@Column
	@Email
	private String email;

	public Person() {}

	public Person(String username, String fullName, String email, String password) {
		this.fullName = fullName;
		this.userName = username;
		this.email = email;
		this.password = password;
	}

	public String getName() {
		return fullName;
	}

	public long getId() {
		return this.id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return userName;
	}

	public List<SavedGame> getSavedGameList() {
		return this.savedGameList;
	}

	public void addSavedGame(SavedGame savedGame) {
		this.savedGameList.add(savedGame);
	}

	public void setSavedGameList(List<SavedGame> savedGameList) {
		this.savedGameList = savedGameList;
	}
}
