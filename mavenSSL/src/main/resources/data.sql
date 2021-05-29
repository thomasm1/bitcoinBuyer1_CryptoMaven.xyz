
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (111, 'Ethereum2', 'ETH', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (222, 'Bitcoin2', 'BTC', 'coin', 35.08, 26.88, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (333, 'Hex2', 'HEX', 'erc20Token', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (444, 'ChainLink2', 'LINK', 'erc20Token', 35.08, 26.88, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (555, 'Ripple2', 'XRP', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (666, 'Cardano2', 'ADA', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (777, 'Aave2', 'AAVE', 'erc20Token', 35.08, 26.88, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (888, 'Stellar2', 'XLM', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (999, 'Neo2', 'NEO', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (1111, 'Monero2', 'XMR', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (1222, 'Compound2', 'COMP', 'erc20Token', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (1333, 'Litecoin2', 'LTC', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
  (1444, 'Yearn2', 'YFI', 'coin', 94.83, 66.83, 120005);
INSERT INTO Product (id, coin_name, symbol, category, retail_price, discounted_price, volume) VALUES
(1555, 'Polygon2', 'MATIC', 'coin', 94.83, 66.83, 120005);

CREATE TABLE post(id NUMBER(10), did VARCHAR2(20), date_ VARCHAR2(20) , author VARCHAR2(20) , month_order VARCHAR2(20), cat3 VARCHAR2(20), title VARCHAR2(20), post VARCHAR2(2000), blogcite VARCHAR2(200), username  VARCHAR2(20));

--                                                                                                      DROP TABLE POST;
                                                                                                                COMMIT;
                                                                                                                   SELECT * FROM POST;
                                                                                                                   insert into post(id, did, date_, author, month_order, cat3, title, post, blogcite, username)
                                                                                                                   values(1001,'did1','date_1', 'author','monthOrder1','cat3', 'title1', 'post1', 'blogcite1', 'username1');

                                                                                                                   insert into post(id, did, date_, author, month_order, cat3, title, post, blogcite, username)
                                                                                                                   values(1002,'did2','date_2', 'author','monthOrder2','cat23', 'title2', 'post2', 'blogcite2', 'username2');

                                                                                                                   insert into post(id, did, date_, author, month_order, cat3, title, post, blogcite, username)
                                                                                                                   values(1003,'did3','date_3', 'author3','monthOrder3','cat33', 'title3', 'post3', 'blogcite3', 'username3');