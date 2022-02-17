// const Sequelize = require('sequelize');
// const db = require('../config/database.js');
 
const july3_2019 = {
    "Date": "2019-07-03",
    "Symbol": "BTCUSD",
    "Open": 10829.18,
    "High": 12014.6,
    "Low": 10829.18,
    "Close": 11976.42,
    "Volume BTC": 36836.85,
    "Volume USD": 419076229.34
  };

      // I'm assing in first arg, crypto database, and  
       // 2nd parameter is description of new object being created
  const InputStream = newDat('newDat', {    // mySql to come
      name: {
        String: "Date"
      }, 
      name: {
        String: "Symbol"
          }, 
    name: {
        Number: "Open"
              },  
    name: {
        Number: "High"
            },   
    name: {
        Number: "Low"
          },   
    name: {
        Number: "Close"
          },  
    name: {
        Number:  "Volume BTC"
        } 
    });
 
//     InputStream.sync().then(() => {  // mySql to come
//   console.log('InputStream table created');
// }); 
// console.log(Inst);
module.exports = InputStream;