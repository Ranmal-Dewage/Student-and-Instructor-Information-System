/**
 * 
 */
package com.sliit.af.service;

import org.springframework.context.ApplicationListener;

import com.sliit.af.util.OnRegistrationEvent;

/**
 * @author vimukthi_r
 * @Date Apr 29, 2019
 * @Description
 * @Version
 */
public interface EmailService extends ApplicationListener<OnRegistrationEvent> {
	public void sendEmail(String to, String subject, String text);
}
