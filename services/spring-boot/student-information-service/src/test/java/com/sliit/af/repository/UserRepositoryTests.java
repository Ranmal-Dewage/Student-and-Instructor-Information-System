/**
 * 
 */
package com.sliit.af.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.sliit.af.model.User;

/**
 * @author Vimukthi_r
 *
 */
@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTests {
	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	UserRepository userRepository;

	User user = new User();
	User user1 = new User();

	@Before
	public void setup() {
		user.setId("1");
		user.setEmail("user@user.com");
		user.setPassword("password");

		user1.setId("2");
		user1.setEmail("user1@user.com");
		user1.setPassword("password1");

		entityManager.persist(user);
		entityManager.persist(user1);
		entityManager.flush();
	}

	@Test
	public void whenInvalidEmailAndPassword_ThenNullShouldReturn() {
		assertThat(userRepository.findByEmailAndPassword("notUser@user.com", "password")).isNull();
	}

	@Test
	public void whenValidEmailAndPassword_ThenUserShouldReturn() {
		assertThat(userRepository.findByEmailAndPassword("user@user.com", "password").get())
				.hasFieldOrPropertyWithValue("username", "User");
	}

	@Test
	public void whenUserId_thenUserShouldRemove() {
		userRepository.deleteById(user.getId());

		assertThat(userRepository.findByEmailAndPassword("user1@user.com", "password1")).isEqualTo(user1);
		assertThat(userRepository.findByEmailAndPassword("user2@user.com", "InvalidPassword")).isNull();
	}

	@Test
	public void whenUserDeatails_thenUserIdShouldReturn() {
		User user2 = new User();
		user2.setId("3");
		user2.setEmail("user2@user.com");
		user2.setPassword("password2");

		User savedUser = userRepository.save(user2);

		assertThat(savedUser).hasFieldOrPropertyWithValue("email", "user2@user.com");
		assertThat(savedUser.getId()).isEqualTo("3");

	}
}
