require('dotenv').config()
 

export const config = {
  passport: {
    secret: 'node.js_sample_secret_key_1asd134',  //
    expiresIn: 10000,
  },
  env: {
    port: 9091,  // PORT 9091 !!
    py_mongo : process.env.PW_MONGO,
    mongoDBUri:
      process.env.ENV === 'prod'   // PW STORED IN >ENV VARS<
        ? `mongodb://thomas:${pw_mongo}@cluster1-shard-00-00-jgrue.mongodb.net:27017,cluster1-shard-00-01-jgrue.mongodb.net:27017,cluster1-shard-00-02-jgrue.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin&retryWrites=true&w=majority`
        : 'mongodb://localhost/dpa',
    mongoHostName: process.env.ENV === 'prod' ? 'mongodbAtlas' : 'localhost',
  },
};

export const underscoreId = '_id';

 