/**
 * 
 */
package com.sliit.af.service;

/**
 * @author vimukthi_r
 * @Date Apr 29, 2019
 * @Description
 * @Version
 */
public interface EmailService {
	public void sendEmail(String to, String subject, String text);
}
