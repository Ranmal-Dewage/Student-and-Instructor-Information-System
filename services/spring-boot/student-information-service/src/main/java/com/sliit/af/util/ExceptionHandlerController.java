/**
 * 
 */
package com.sliit.af.util;

import static java.util.stream.Collectors.toMap;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sliit.af.response.ErrorResponse;

/**
 * @author vimukthi_r
 * @Date Apr 30, 2019
 * @Description
 * @Version
 */
@RestControllerAdvice
public class ExceptionHandlerController {

	/**
	 * This method will handle globally thrown MethodArgumentNotValid Exceptions And
	 * will return an errorResponse
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

		Map<String, String> errorFieldList = new HashMap<>();
		Map<String, String> nullFieldList = null;
		ErrorResponse errorResponse = new ErrorResponse();

		errorResponse.setResponseCode("01");
		try {

			// getting format invalid errorList
			errorFieldList = ex.getBindingResult().getFieldErrors().stream()
					.filter(i -> Objects.nonNull(i.getRejectedValue()))
					.collect(toMap(FieldError::getField, FieldError::getDefaultMessage));

			// getting null errorList
			nullFieldList = ex.getBindingResult().getFieldErrors().stream()
					.filter(i -> Objects.isNull(i.getRejectedValue()))
					.collect(toMap(FieldError::getField, FieldError::getDefaultMessage));

			if (!nullFieldList.isEmpty()) {
				errorResponse.setReason(nullFieldList.toString());
			} else {
				errorResponse.setReason(errorFieldList.toString());
			}

		} catch (Exception e) {
			errorResponse.setReason(e.getMessage());
		}
		return errorResponse;
	}

}
