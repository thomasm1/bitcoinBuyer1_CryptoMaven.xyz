CREATE SEQUENCE IF NOT EXISTS product_seq;
 DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
  id BIGINT,
  coin_name VARCHAR(250) NOT NULL,
  coin_description VARCHAR(260),
  symbol VARCHAR(25) NOT NULL,
  category VARCHAR(250),
  retail_price DOUBLE,
  discounted_price DOUBLE,
  volume DOUBLE,
  price DECIMAL(10,2),
  image_url VARCHAR(400) );

CREATE SEQUENCE IF NOT EXISTS post_seq;
 DROP TABLE IF EXISTS Post;
CREATE TABLE Post (
    id BIGINT,
    did VARCHAR(201),
    date_ VARCHAR(20),
    author VARCHAR(20),
    month_order VARCHAR(20),
    cat3 VARCHAR(20),
    title VARCHAR(209),
    post VARCHAR(2000),
    blogcite VARCHAR(600),
    username  VARCHAR(60));

CREATE SEQUENCE IF NOT EXISTS user_seq;

 DROP TABLE IF EXISTS User;
 CREATE TABLE User(
    id BIGINT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(20),
    image VARCHAR(20));