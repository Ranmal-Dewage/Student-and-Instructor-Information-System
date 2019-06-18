/**
 * 
 */
package com.sliit.af.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author vimukthi_r
 *
 */
@Document(collection = "User")
@Data
@NoArgsConstructor
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
	private String email;
	@NotBlank
	private String password;
}
