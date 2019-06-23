/**
 * 
 */
package com.sliit.af.studentinformationservice.serviceTests;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.HashSet;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.sliit.af.domain.UserDTO;
import com.sliit.af.model.Role;
import com.sliit.af.model.User;
import com.sliit.af.repository.RoleRepository;
import com.sliit.af.repository.UserRepository;
import com.sliit.af.service.UserService;
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

		@Bean
		public BCryptPasswordEncoder bCryptPasswordEncoder() {
			return new BCryptPasswordEncoder();
		}
	}

	@Autowired
	UserService userService;
	@MockBean
	UserRepository userRepository;
	@MockBean
	RoleRepository roleRepository;

	@Before
	public void setup() {
		User user = new User();
		User user1 = new User();
		User user2 = new User();
		Role role = new Role("1", "Admin");

		user.setId("1");
		user.setEmail("user@user.com");
		user.setPassword("password");

		user1.setEmail("user1@user.com");
		user1.setPassword("password1");

		user2.setId("3");
		user2.setEmail("user2@user.com");
		user2.setPassword("password2");

		User userWithId = user1;
		userWithId.setId("2");
		userWithId.setRoles(new HashSet<>(Arrays.asList(role)));

		Mockito.when(userRepository.findById("1")).thenReturn(Optional.of(user));
		Mockito.when(userRepository.findByEmailAndPassword("user@user.com", "password")).thenReturn(Optional.of(user));
		Mockito.when(userRepository.findByEmail("user@user.com")).thenReturn(Optional.of(user));
		Mockito.when(userRepository.findAll()).thenReturn(Arrays.asList(user, user1, user2));
		Mockito.when(userRepository.save(user1)).thenReturn(userWithId);
	}

	@Test
	public void whenUserId_thenUserBeanShouldReturn() {
		assertThat(userService.getUserById("1")).hasFieldOrPropertyWithValue("email", "user@user.com");
	}

	@Test
	public void whenInvalidUserId_thenNullShouldReturn() {
		assertThat(userService.getUserById("10")).isEqualTo(null);
	}

	@Test
	public void whenFindAll_thenUserBeansListShouldReturn() {
		List<User> List = userService.getAll();
		User lastUserBean = null;
		for (User user : List) {
			lastUserBean = user;
		}
		assertThat(List).hasSize(3);
		assertThat(lastUserBean).hasFieldOrPropertyWithValue("email", "user2@user.com");
	}

	@Test
	public void whenFindByEmailAndPassword_thenUserBeanShouldReturn() {
		UserDTO userDTO = new UserDTO("user@user.com", "password");
		assertThat(userService.getByEmailAndPassword(userDTO)).hasFieldOrPropertyWithValue("email", "user@user.com");
	}

	@Test
	public void whenInvalidEmailAndPassword_thenNullShouldReturn() {
		UserDTO userDTO = new UserDTO("noUser@user.com", "password");
		assertThat(userService.getByEmailAndPassword(userDTO)).isEqualTo(null);
	}

	@Test
	public void whenFindByEmail_thenUserBeanShouldReturn() {
		assertThat(userService.getByEmail("user@user.com")).hasFieldOrPropertyWithValue("email", "user@user.com");
	}

	@Test
	public void whenInvalidEmail_thenNullShouldReturn() {
		assertThat(userService.getByEmail("userNo@user.com")).isEqualTo(null);
	}
	
	@Test
	public void whenRequestForAll_thenAllUsersShouldReturn() {
		assertThat(userService.getAll().size(), is(3));
	}
}
