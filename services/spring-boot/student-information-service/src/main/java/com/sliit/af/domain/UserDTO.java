/**
 * 
 */
package com.sliit.af.domain;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Vimukthi Rajapaksha
 * @date Apr 28, 2019
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	@NotBlank
	private String email;
	@NotBlank
	private String password;
}
