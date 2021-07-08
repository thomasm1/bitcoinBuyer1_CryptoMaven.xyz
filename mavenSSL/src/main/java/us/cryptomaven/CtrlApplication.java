package us.cryptomaven;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import us.cryptomaven.domain.Product;
import us.cryptomaven.domain.User;
import us.cryptomaven.repositories.ProductRepository;
import us.cryptomaven.repositories.UserRepository;

import java.util.Arrays;

@SpringBootApplication
public class CtrlApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(CtrlApplication.class);

	@Autowired
	UserRepository userRepo;

	@Autowired
	ProductRepository prodRepo;

	public static void main(String[] args) {
		LOGGER.info("starting info message");
		LOGGER.warn("starting warn message");
		LOGGER.error("starting error message");
		SpringApplication.run(CtrlApplication.class, args);

		
		
	}


	@Bean
	CommandLineRunner runner() {

		return args -> {
			User user1 = new User(3333L,  "firstName",   "lastName",  "email@gmail.com", "passwordx", "http://tmm.net/images");
			User user2 = new User(444L, "Mike", "Lanister", "lanister@gmail.com", "passwordx", "http://tmm.net/images");
			User user3 = new User(555L, "Steve", "Reeves", "Reeves@gmail.com",  "passwordx", "http://tmm.net/images");

			User user4 = new User(6677L, "Ronald", "Connor", "connor@gmail.com",   "passwordx", "http://tmm.net/images");
			User user5 = new User(666L, "Jim", "Salvator", "Sal@gmail.com",   "passwordx", "http://tmm.net/images");
			User user6 = new User(777L, "Peter", "Henley", "henley@gmail.com",   "passwordx", "http://tmm.net/images");

			User user7 = new User(7777L, "Richard", "Carson", "carson@gmail.com",   "passwordx", "http://tmm.net/images");
			User user8 = new User(885L, "Honor", "Miles", "miles@gmail.com",   "passwordx", "http://tmm.net/images");
			User user9 = new User(8885L, "Tony", "Roggers", "roggers@gmail.com",   "passwordx", "http://tmm.net/images");
//
//
//			Product pro1 = new Product("Large Production Deploy", "NOTSTARTED", "This requires all hands on deck for"
//					+ "the final deployment of the software into production");
//			Product pro2 = new Product("New User Budget",  "COMPLETED", "Decide on a new employee bonus budget"
//					+ "for the year and figureout who will be promoted");
//			Product pro3 = new Product("Office Reconstruction", "INPROGRESS", "The office building in Monroe has "
//					+ "been damaged due to hurricane in the region. This needs to be reconstructed");
//			Product pro4 = new Product("Improve Intranet Security", "INPROGRESS", "With the recent data hack, the office"
//					+ "security needs to be improved and proper security team needs to be hired for "
//					+ "implementation");
//
//
//
//			// need to set both sides of the relationship manually
//
//			pro1.setUser(user1);
//			pro1.setUser(user2);
//			pro2.setUser(user3);
//			pro3.setUser(user1);
//			pro4.setUser(user1);
//			pro4.setUser(user3);
//
//
//			// need to set both sides of the relationship manually
//
//			user1.setProducts(Arrays.asList(pro1, pro3, pro4));
//			user2.setProducts(Arrays.asList(pro1));
//			user3.setProducts(Arrays.asList(pro2, pro4));

//
			userRepo.save(user1);
			userRepo.save(user2);
			userRepo.save(user3);
			userRepo.save(user4);
			userRepo.save(user5);
			userRepo.save(user6);
			userRepo.save(user7);
			userRepo.save(user8);
			userRepo.save(user9);

//
//			// save prodects in database
//
//			prodRepo.save(pro1);
//			prodRepo.save(pro2);
//			prodRepo.save(pro3);
//			prodRepo.save(pro4);
//
//
		};

	}
}
