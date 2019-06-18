package com.sliit.af.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.sliit.af.model.User;
import com.sliit.af.service.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@Test
	public void getUsersTest() throws Exception {
		User user = new User();
		user.setFirstName("admin");

		List<User> allUsers = Arrays.asList(user);

		given(userService.getAll()).willReturn(allUsers);

		mockMvc.perform(get("/v1/users").contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1))).andExpect(jsonPath("$[0].username", is(user.getFirstName())));
	}

}
