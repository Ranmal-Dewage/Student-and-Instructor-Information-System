/**
 * 
 */
package com.sliit.af.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sliit.af.model.User;
import com.sliit.af.service.UserService;
import com.sliit.af.util.OnRegistrationEvent;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 28, 2019
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	ApplicationEventPublisher eventPublisher;
	@Value("${student.info.loging.url}")
	private String logingUrl;

	/**
	 * This method will save a new user in the database
	 */
	@PostMapping("")
	public ResponseEntity<?> register(@RequestBody @Valid User user) {
		ResponseEntity<?> responseEntity = null;
		try {
			user = userService.save(user);
			responseEntity = new ResponseEntity<>(user, HttpStatus.OK);
			eventPublisher.publishEvent(new OnRegistrationEvent(UserController.class, user));
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will return all users
	 */
	@GetMapping("")
	public ResponseEntity<?> getAll() {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will return an users with given id
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable("id") String id) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will return an users with given id
	 */
	@GetMapping("/roles/{roleName}")
	public ResponseEntity<?> getByRoleName(@PathVariable("roleName") String roleName) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getByRoleName(roleName), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will return an users with given id
	 */
	@GetMapping("/courses/{courseId}")
	public ResponseEntity<?> getByCourseId(@PathVariable("courseId") String courseId) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.getByCourseId(courseId), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will delete an users with given id
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") String id) {
		ResponseEntity<?> responseEntity = null;
		try {
			userService.delete(id);
			responseEntity = new ResponseEntity<>("User saved with id: " + id, HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	/**
	 * This method will update an user in the database
	 */
	@PutMapping("")
	public ResponseEntity<?> update(@RequestBody User user) {
		ResponseEntity<?> responseEntity = null;
		try {
			responseEntity = new ResponseEntity<>(userService.save(user), HttpStatus.OK);
		} catch (Exception e) {
			responseEntity = new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
		return responseEntity;
	}

	@GetMapping(value = "/regitrationConfirm")
	public ResponseEntity<?> confirmRegistration(@RequestParam("token") String token) {

		User user = userService.getByToken(token);
		if (Objects.isNull(user)) {
			return new ResponseEntity<>("registration error", HttpStatus.OK);
		} else if (user.getVerificationToken().getExpiryDate().isBefore(LocalDateTime.now())) {
			/*
			 * user.setEnabled(true); userService.save(user); return "registration success";
			 */
			URI yahoo = null;
			try {
				user.setEnabled(true);
				userService.save(user);

				yahoo = new URI(logingUrl);
				HttpHeaders httpHeaders = new HttpHeaders();
				httpHeaders.setLocation(yahoo);
				return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}
		return new ResponseEntity<>("registration not complete", HttpStatus.OK);
	}
}
