package classes.objects;

import org.hibernate.validator.constraints.Email;
import org.springframework.data.annotation.Transient;

import javax.persistence.*;

@Entity
public class Person {

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

	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return userName;
	}
}
