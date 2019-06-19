/**
 * 
 */
package com.sliit.af.model;

import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author vimukthi_r
 *
 */
@Document(collection = "user")
@Data
@NoArgsConstructor
@CompoundIndex(name = "email_pwd_idx", def = "{'email' : 1, 'password' : 1}")
public class User {
	@Id
	private String id;
	@NotBlank
	private String firstName;
	@NotBlank
	private String lastName;
	@NotBlank
	private String mobile;
	@NotBlank
	@Email
	@Indexed
	private String email;
	@NotBlank
	private String password;
	private boolean isEnabled;
	@DBRef
	@Valid
	private Set<Role> roles;
}
