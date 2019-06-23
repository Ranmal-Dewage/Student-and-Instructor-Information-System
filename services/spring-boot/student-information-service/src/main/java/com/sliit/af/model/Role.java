/**
 * 
 */
package com.sliit.af.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author vimukthi_r
 *
 */
@Document(collection = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
	@Id
	private String id;
	@Indexed
	@NotBlank
	@Pattern(regexp="ADMIN|INSTRUCTOR|STUDENT")
	private String role;
}
