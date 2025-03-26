function fn() {
    var env = karate.env; // get system property 'karate.env'
    karate.log('karate.env system property was:', env);
    if (!env) {
        env = 'mysql';
    }
    karate.log('karate.env is:', env);

    var apiKey = ''
    var pw =  '' // process.env.MYSQL_AWS_DB_PASSWORD;
    karate.log('Database Password:', pw);

    var config = {
        env: env,
        baseUrl: '',
        username: 'thomas@gmail.xyz',
        password: 'password',
        spring_datasource_url: '',
        spring_datasource_username: '',
        spring_datasource_password: pw
    };

    if (env === 'local' || env === 'h2') {
        config.baseUrl = 'http://localhost:8083/';
        config.spring_datasource_url = "jdbc:mysql://localhost:3306/groot?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false";
        karate.log('Using Local or H2 environment. Base URL:', config.baseUrl);
    }
    else if (env === 'dev' || env === 'mysql') {
        config.baseUrl = 'http://52.3.58.191:8083/';
        config.spring_datasource_url = "jdbc:mysql://cryptomav3n.ce1qqymm6i27.us-east-1.rds.amazonaws.com:3306/cryptomav3n?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false";
        config.spring_datasource_username = "admin";
        config.spring_datasource_password = pw;
        karate.log('Using Dev/MySQL environment. Base URL:', config.baseUrl);
    }
    else if (env === 'prod') {
        config.baseUrl = 'http://52.3.58.191:8083/';
        config.spring_datasource_url = "jdbc:mysql://cryptomav3n.ce1qqymm6i27.us-east-1.rds.amazonaws.com:3306/cryptomav3n?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false";
        config.spring_datasource_username = "admin";
        config.spring_datasource_password = pw;
        karate.log('Using Production environment. Base URL:', config.baseUrl);
    }

    // Set API Key if needed
    // karate.configure('apiKey',  apiKey);
    return config;
}
