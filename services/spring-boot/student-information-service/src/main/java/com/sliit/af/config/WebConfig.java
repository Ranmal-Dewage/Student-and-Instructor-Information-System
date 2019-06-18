/**
 * 
 */
package com.sliit.af.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	/**
	 * This method will enable CORS
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("Content-Type", "Authorization", "cache-control")
				.exposedHeaders("Authorization", "UserID").allowCredentials(true).maxAge(3600);
	}

}
