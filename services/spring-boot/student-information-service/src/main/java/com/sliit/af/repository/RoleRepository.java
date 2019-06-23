/**
 * 
 */
package com.sliit.af.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sliit.af.model.Role;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 15, 2019
 */
public interface RoleRepository extends MongoRepository<Role, String> {

	public Optional<Role> findByRole(String role);
}
