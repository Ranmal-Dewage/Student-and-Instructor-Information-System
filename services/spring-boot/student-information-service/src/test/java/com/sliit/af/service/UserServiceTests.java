/**
 * 
 */
package com.sliit.af.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import com.sliit.af.domain.UserDTO;
import com.sliit.af.model.User;
import com.sliit.af.repository.UserRepository;
import com.sliit.af.service.impl.UserServiceImpl;

/**
 * @author Vimukthi_r
 *
 */
@RunWith(SpringRunner.class)
public class UserServiceTests {

	@TestConfiguration
	public static class UserServiceImplTestConfiguration {

		@Bean
		public UserService userService() {
			return new UserServiceImpl();
		}
	}

	@Autowired
	UserService userService;
	@MockBean
	UserRepository userRepository;

	@Before
	public void setup() {
		User user = new User();
		User user1 = new User();
		User user2 = new User();

		user.setId("1");
		user.setEmail("user@user.com");
		user.setPassword("password");

		user1.setId("2");
		user1.setEmail("user1@user.com");
		user1.setPassword("password1");

		user2.setId("3");
		user2.setEmail("user2@user.com");
		user2.setPassword("password2");

		Mockito.when(userRepository.findById("1")).thenReturn(Optional.of(user));
		Mockito.when(userRepository.findByEmailAndPassword("user@user.com", "password")).thenReturn(Optional.of(user));
		Mockito.when(userRepository.findAll()).thenReturn(Arrays.asList(user, user1, user2));
	}

	@Test
	public void whenUserId_thenUserBeanShouldReturn() {
		assertThat(userService.getUserById("1")).hasFieldOrPropertyWithValue("username", "testUser");
	}

	@Test
	public void whenFindAll_thenUserBeansListShouldReturn() {
		List<User> List = userService.getAll();
		User lastUserBean = null;
		for (User user : List) {
			lastUserBean = user;
		}
		assertThat(List).hasSize(3);
		assertThat(lastUserBean).hasFieldOrPropertyWithValue("email", "user@user.com2");
	}

	@Test
	public void whenFindByEmailAndPassword_thenUserBeanShouldReturn() {
		UserDTO userDTO = new UserDTO("user@user.com", "password");
		assertThat(userService.getByEmailAndPassword(userDTO)).hasFieldOrPropertyWithValue("email", "user@user.com");
	}
}
