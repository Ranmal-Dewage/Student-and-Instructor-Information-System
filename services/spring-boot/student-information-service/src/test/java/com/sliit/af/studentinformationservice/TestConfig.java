/**
 * 
 */
package com.sliit.af.studentinformationservice;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;

import com.sliit.af.service.UserService;
import com.sliit.af.service.impl.UserServiceImpl;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 28, 2019
 */
@TestConfiguration
public class TestConfig {

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean public UserService getUserService() {
		return new UserServiceImpl();
	}
}
