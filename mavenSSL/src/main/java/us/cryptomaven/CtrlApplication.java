package us.cryptomaven;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CtrlApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(CtrlApplication.class);

	public static void main(String[] args) {
		LOGGER.info("starting info message");
		LOGGER.warn("starting warn message");
		LOGGER.error("starting error message");
		SpringApplication.run(CtrlApplication.class, args);

	}

}
