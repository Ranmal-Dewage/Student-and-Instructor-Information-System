/**
 * 
 */
package com.sliit.af.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sliit.af.service.EmailService;

/**
 * @author vimukthi_r
 * @Date Apr 29, 2019
 * @Description
 * @Version
 */
@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	public JavaMailSender emailSender;
	@Value("${spring.mail.username:ds-assignment@mail.com}")
	private String from;

	/**
	 * This method will send an email to user email with passed String subject as
	 * email subject and String text as email body
	 */
	@Override
	public void sendEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		emailSender.send(message);
	}
}
