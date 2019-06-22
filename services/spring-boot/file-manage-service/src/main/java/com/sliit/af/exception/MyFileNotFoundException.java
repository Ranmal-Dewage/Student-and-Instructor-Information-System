/**
 * 
 */
package com.sliit.af.exception;

/**
 * @author vimukthi_r
 *
 */
public class MyFileNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8878771581626075766L;

	public MyFileNotFoundException(String message) {
		super(message);
	}
}
