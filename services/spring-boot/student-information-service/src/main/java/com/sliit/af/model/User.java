/**
 * 
 */
package com.sliit.af.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

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
	private String address;
	@NotBlank
	@Email
	@Indexed
	private String email;
	@NotBlank
	private String password;
	private int permissionLevel;
	private boolean isEnabled;
	@DBRef
	@Valid
	private Set<Role> roles;
	@Valid
	private VerificationToken verificationToken;
	private List<String> faculty;
	private List<String> degree;
	private List<String> courses = new ArrayList<>();
	@Pattern(regexp = "(^[0-9]{9}[vVxX]$)||(^[0-9]{12}$)", message="Invalid NIC")
	private String nic;
}
