/**
 * 
 */
package com.sliit.af.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

/**
 * @author Vimukthi Rajapaksha
 * @date Jun 2, 2019
 */
@Aspect
@Configuration
public class LoggingAspect {
	public static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

	@Before("execution(* com.sliit.af.*.*.*(..))")
	public void loggingBeforeServices(JoinPoint joinPoint) {
		// advice
		logger.info("begin executing {} with parameters {}", joinPoint, joinPoint.getArgs());
	}

	@AfterReturning(value = "execution(* com.af2018.backend.serviceImpl.*.*(..))", returning = "result")
	public void loggingAfterReturningServices(JoinPoint joinPoint, Object result) {
		// advice
		logger.info("{} returned with value {}", joinPoint, result);
	}

	@After(value = "execution(* com.af2018.backend.serviceImpl.*.*(..))")
	public void loggingAfterServices(JoinPoint joinPoint) {
		// advice
		logger.info("after execution of {}", joinPoint);
	}
}
