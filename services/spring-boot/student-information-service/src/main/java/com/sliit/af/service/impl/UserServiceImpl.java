/**
 * 
 */
package com.sliit.af.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sliit.af.domain.UserDTO;
import com.sliit.af.model.Role;
import com.sliit.af.model.User;
import com.sliit.af.model.VerificationToken;
import com.sliit.af.repository.RoleRepository;
import com.sliit.af.repository.UserRepository;
import com.sliit.af.service.UserService;
import com.sliit.af.util.Param;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 15, 2019
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
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
		} else if (!user.isEnabled()) {
			throw new UsernameNotFoundException("Activate your account first");
		}
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), true, // Email
				true, // verification status
				true, true, getUserAuthority(user.getRoles()));
	}

	/**
	 * This method will save user object to database
	 */
	@Override
	public User save(User user) {
		if (Objects.isNull(user.getId())) {
			// when user is a new user. insert only
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			generateVerficationToken(user, UUID.randomUUID());
			Optional<Role> requestedRole = user.getRoles().stream().findFirst();
			if (requestedRole.isPresent()) {
				setPermissionLevel(requestedRole.get(), user);
				user.setRoles(new HashSet<>(
						Arrays.asList(roleRepository.findByRole(requestedRole.get().getRole()).orElse(null))));
			}
		} else {
			// for update
			Optional<User> dbUser = userRepository.findById(user.getId());
			if (dbUser.isPresent() && Objects.nonNull(user.getCourses())) {
				dbUser.get().setCourses(user.getCourses());
				dbUser.get().setEnabled(user.isEnabled());
			}
			return userRepository.save(dbUser.get());
		}
		// for insert
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
	 * This method will fetch all user objects from database
	 */
	@Override
	public List<User> getByRoleName(String roleName) {
		List<User> userList = userRepository.findAll();
		List<User> returnList = new ArrayList<>();
		for (User user : userList) {
			Set<Role> roleSet = user.getRoles();
			for (Role role : roleSet) {
				if (role.getRole().equalsIgnoreCase(roleName)) {
					returnList.add(user);
				}
			}
		}
		return returnList;
	}

	/**
	 * This method will fetch all user objects from database
	 */
	@Override
	public List<User> getByCourseId(String courseId) {
		return userRepository.findAll().stream().filter(user -> user.getCourses().contains(courseId))
				.collect(Collectors.toList());
	}

	/**
	 * This method will delete user object from database
	 */
	@Override
	public void delete(String id) {
		userRepository.deleteById(id);
	}

	private List<GrantedAuthority> getUserAuthority(Set<Role> userRoles) {
		Set<GrantedAuthority> roles = new HashSet<>();
		userRoles.forEach(role -> roles.add(new SimpleGrantedAuthority(role.getRole())));

		List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
		return grantedAuthorities;
	}

	public void generateVerficationToken(User user, UUID token) {
		VerificationToken verificationToken = new VerificationToken();
		verificationToken.setExpiryDate(LocalDateTime.now());
		verificationToken.setToken(token.toString());
		verificationToken.setId(UUID.randomUUID().toString());

		user.setVerificationToken(verificationToken);
	}

	private void setPermissionLevel(Role role, User user) {
		switch (role.getRole()) {
		case Param.ADMIN:
			user.setPermissionLevel(3);
			break;
		case Param.INSTRUCTOR:
			user.setPermissionLevel(2);
			break;
		case Param.STUDENT:
			user.setPermissionLevel(1);
			break;
		default:
			break;
		}
	}

	@Override
	public User getByToken(String token) {
		return userRepository.findByVerificationTokenToken(token).orElse(null);
	}
}
