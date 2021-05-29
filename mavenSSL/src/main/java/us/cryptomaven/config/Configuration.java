package us.cryptomaven.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean(name = "entityManagerFactory")
    public LocalSessionFactoryBean sessionFactory() {
        final Logger LOGGER = LoggerFactory.getLogger(Configuration.class);

        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        LOGGER.info("=========entityManagerFactory initialized=====================");

        return sessionFactory;
    }


}
