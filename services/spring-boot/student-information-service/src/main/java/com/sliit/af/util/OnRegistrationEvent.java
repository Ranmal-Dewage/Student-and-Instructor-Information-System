/**
 * 
 */
package com.sliit.af.util;

import org.springframework.context.ApplicationEvent;

import com.sliit.af.model.User;

import lombok.Getter;
import lombok.Setter;

/**
 * @author vimukthi_r
 *
 */
@Getter
@Setter
public class OnRegistrationEvent extends ApplicationEvent {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8329608698733437942L;

	private User user;

	/**
	 * @param source
	 * @param appUrl
	 * @param locale
	 * @param user
	 */
	public OnRegistrationEvent(Object source, User user) {
		super(source);
		this.user = user;
	}
}
