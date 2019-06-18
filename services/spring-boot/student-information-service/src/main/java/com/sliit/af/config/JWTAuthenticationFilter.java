package com.sliit.af.config;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.sliit.af.util.Param.EXPIRATION_TIME;
import static com.sliit.af.util.Param.HEADER_STRING;
import static com.sliit.af.util.Param.SECRET;
import static com.sliit.af.util.Param.TOKEN_PREFIX;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sliit.af.domain.UserDTO;

/**
 * This class will do user authentication
 *
 */
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	/**
	 * This method will authenticate the user using email and password
	 */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException {
		try {
			UserDTO creds = new ObjectMapper().readValue(req.getInputStream(), UserDTO.class);

			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * This method will add auth token to header after successful login
	 */
	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		PrintWriter out = res.getWriter();

		String userEmail = ((User) auth.getPrincipal()).getUsername();
		String token = JWT.create().withSubject(((User) auth.getPrincipal()).getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).sign(HMAC512(SECRET.getBytes()));
		res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);

		out.print(userEmail);
		out.flush();
	}
}