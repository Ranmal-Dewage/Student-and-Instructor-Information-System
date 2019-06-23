/**
 * 
 */
package com.sliit.af.model;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author vimukthi_r
 *
 */
@Document(collection = "verificationToken")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationToken {
	@Id
	private String id;
	@Indexed
	@NotBlank
	private String token;
	@LastModifiedDate
	private LocalDateTime expiryDate;
}
