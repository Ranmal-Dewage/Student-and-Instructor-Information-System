/**
 * 
 */
package com.sliit.af.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.sliit.af.domain.UserDTO;
import com.sliit.af.model.User;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 15, 2019
 */
public interface UserService extends UserDetailsService {

	public User getUserById(String id);
	
	public List<User> getByRoleName(String roleName);
	
	public List<User> getByCourseId(String courseId);

	public User getByEmailAndPassword(UserDTO userDTO);

	public User getByEmail(String email);
	
	public User getByToken(String token);

	public User save(User user);

	public List<User> getAll();

	public void delete(String id);
}
