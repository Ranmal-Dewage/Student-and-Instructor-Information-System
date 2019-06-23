package net.epiclanka.acs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@EnableCircuitBreaker
@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
public class AcsZuulserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AcsZuulserviceApplication.class, args);
	}
}
