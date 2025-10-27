package com.clalix.smart_gas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartGasApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartGasApplication.class, args);
	}

}
