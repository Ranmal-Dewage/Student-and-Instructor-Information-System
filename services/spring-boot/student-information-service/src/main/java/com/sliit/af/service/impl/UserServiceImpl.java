/**
 * 
 */
package com.sliit.af.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sliit.af.domain.UserDTO;
import com.sliit.af.model.User;
import com.sliit.af.repository.UserRepository;
import com.sliit.af.service.UserService;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 15, 2019
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	/**
	 * This method will return User object by its id
	 */
	@Override
	public User getUserById(String id) {
		return userRepository.findById(id).orElse(null);
	}

	/**
	 * This method will return User object using email and password
	 */
	@Override
	public User getByEmailAndPassword(UserDTO userDTO) {
		return userRepository.findByEmailAndPassword(userDTO.getEmail(), userDTO.getPassword()).orElse(null);
	}

	/**
	 * This method will return User object by email
	 */
	@Override
	public User getByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	/**
	 * This method is used for spring security. it will generate userdetails object
	 */
	@Override
	public UserDetails loadUserByUsername(String email) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (Objects.isNull(user)) {
			throw new UsernameNotFoundException(email);
		}
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), true, // Email
				true, // verification status
				true, true, new ArrayList<>());
	}

	/**
	 * This method will save user object to database
	 */
	@Override
	public User save(User user) {
		if (Objects.isNull(user.getId())) {
			// when user is a new user. insert only
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		}
		// for insert and update
		return userRepository.save(user);
	}

	/**
	 * This method will fetch all user objects from database
	 */
	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	/**
	 * This method will delete user object from database
	 */
	@Override
	public void delete(String id) {
		userRepository.deleteById(id);
	}
}
