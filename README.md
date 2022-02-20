## Data Analytics Application
### Author: Thomas Maestas
### App Purpose: Data algorithms/structures Exploratory Application

## Crypto Data Streaming

### App Functionality
 #### Data Operation Methods :12:
#### Performance
  * Tool: https://rithmschool.github.io/function-timer-demo/


```sh
 DataBinaryTreeClass
 bST.printDataBinaryTree();
 bST.add(data);
    findMin() {
    findMax() {
    find(data) {
    isPresent(data) {
    remove(data) {
    isBalanced() {
    findMinHeight(node = this.root) {
```

### UI
##### Dependencies
-Node.js 
-Express

### CryptoMaven's Data Structures: 
```sh
{
    "Date": "2019-07-04",
    "Symbol": "BTCUSD",
    "Open": 11976.42,
    "High": 12064.26,
    "Low": 11820,
    "Close": 11909.55,
    "Volume BTC": 1237.57,
    "Volume USD": 14790355.69
  }
``` 
##### Dependencies
* D3js

### Database: 
* commuterlink.cmcadlepsyx9.us-east-1.rds.amazonaws.com
* AWS PostgreSQL 
* Auto-detected PostgreSQL 10 installation with the data directory at C:\Program Files\PostgreSQL\10\data

###  server-nginx
#### Load Balancer 
* localhost port 5000
* NGINX -Digital Ocean:  [134.122.15.249] 
          -https://hexstat.xyz
          -local: /home/ubuntu/nfs

* NGINX -AWS - [35.175.138.209]  
          * local: /home/thomas/apps/
          * bitcoinBuyer1-findersCalculators
          * https://cryptomaven.xyz https://cryptomaven.us


### solidity 
#### Custom Blockchain App
##### Dependencies
* crypto (built-in Node module)
* npm run block :: Start blockchain

### INSTRUCTIONS
Development: npm run block

Start Chain: npm run start 

OUTPUT::
```sh
$ npm run start

> server-blockchain@1.0.0 start C:\w\www\git\armchair\bitcoinBuyer1-findersCalculators\server-blockchain
> tsc && node .

⛏️⛏️⛏️ mining yo ⛏️⛏️⛏️
Solved: 11864
⛏️⛏️⛏️ mining yo ⛏️⛏️⛏️
Solved: 101775
⛏️⛏️⛏️ mining yo ⛏️⛏️⛏️
Solved: 3064
Chain {
  chain: [
    Block {
      prevHash: null,
      transaction: [Transaction],
      ts: 1615688487672,
      nonce: 88872301
    },
    Block {
      prevHash: '9657459a8695f7af8c217bfc4cd9b92e73314a0bbaa4169efcec9bc8d05ef00
4',
      transaction: [Transaction],
      ts: 1615688488194,
      nonce: 93574180
    },
    Block {
      prevHash: 'bf3583a16e3a5a6df921e7cf0066f75754e0b0de29235ec79bf06a6b9fc4d64
7',
      transaction: [Transaction],
      ts: 1615688488464,
      nonce: 67377836
    },
    Block {
      prevHash: '9b54d0d255be71e49c95b3562dd4ad71b3adf6f2d98e29fa76a92b42a6aa0f4
a',
      transaction: [Transaction],
      ts: 1615688489592,
      nonce: 9465973
    }
  ]
}

```
#### REFERENCES
##### http://vis.stanford.edu/files/2011-D3-InfoVis.pdf