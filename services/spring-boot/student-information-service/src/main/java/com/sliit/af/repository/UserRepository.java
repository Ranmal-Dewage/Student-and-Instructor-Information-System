/**
 * 
 */
package com.sliit.af.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sliit.af.model.User;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 15, 2019
 */
public interface UserRepository extends MongoRepository<User, String> {
	public Optional<User> findByEmailAndPassword(String email, String password);

	public Optional<User> findByEmail(String email);
	
	public Optional<User> findByVerificationTokenToken(String token);
}
