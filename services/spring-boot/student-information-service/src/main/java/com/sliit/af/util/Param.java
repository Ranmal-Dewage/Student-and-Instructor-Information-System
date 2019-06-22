/**
 * 
 */
package com.sliit.af.util;

/**
 * @author vimukthi_r
 *
 */
public class Param {
	private Param() {
	}

	// this secret key is used for json web token signing
	public static final String SECRET = "af-final-2019";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final long EXPIRATION_TIME = 2_400_000; // 40 minutes

	public static final String ADMIN = "ADMIN";
	public static final String INSTRUCTOR = "INSTRUCTOR";
	public static final String STUDENT = "STUDENT";

}
