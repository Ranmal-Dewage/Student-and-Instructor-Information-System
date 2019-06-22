/**
 * 
 */
package com.sliit.af.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sliit.af.service.UserService;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 28, 2019
 */
@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	private final UserService userService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public WebSecurity(UserService usersService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userService = usersService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	/**
	 * This method will, 1. permit all requests for /login end point 2. permit POST
	 * requests for /users/register end point 3. permit all GET requests
	 * 
	 * Other requests need to be authorized
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors();

		// permit all requests for login end point
		http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/login").permitAll()
		.antMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll()
				.antMatchers(HttpMethod.GET, "/users/regitrationConfirm").permitAll()
				// POST requests for /users end point authentication needed for instructors
				.antMatchers(HttpMethod.POST, "/users").permitAll()
				// .access("not( hasRole('" + Param.INSTRUCTOR + "') ) and isAuthenticated()")
				// permit POST requests for /users end point
				.anyRequest().authenticated().and().addFilter(new JWTAuthenticationFilter(authenticationManager()))
				.addFilter(new JWTAuthorizationFilter(authenticationManager()))
				// this disables session creation on Spring Security
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	/**
	 * This method is configuring auth object
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
	}

}
