/**
 * 
 */
package com.sliit.af.response;

/**
 * @author vimukthi_r
 * @Date Apr 30, 2019
 * @Description
 * @Version
 */
public class ErrorResponse {
	private String responseCode;
	private String reason;

	/**
	 * @return the responseCode
	 */
	public String getResponseCode() {
		return responseCode;
	}

	/**
	 * @param responseCode the responseCode to set
	 */
	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	/**
	 * @return the reason
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * @param reason the reason to set
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}
}
