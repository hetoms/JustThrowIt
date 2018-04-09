/*
 * Copyright 2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classes.Application;
import classes.database.PersonRepository;
import classes.objects.Person;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.PersistenceException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest(classes = Application.class)
public class UnitTests {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private PersonRepository personRepository;

	@Before
	public void setup() {
		Person mary = new Person("mary", "asda", "asd@awd.ee", "sdasd");
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
}