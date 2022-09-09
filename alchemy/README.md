## Data Analytics Application
### Author: Thomas Maestas
### App: CryptoMaven
### Application Overview
### App Purpose: Data algorithms/structures Exploratory Application ;
### App Name:  

## Instructions
### API 
#### served on localhost
 
### App Functionality
 
#### Performance Tools
  * Tool: https://rithmschool.github.io/function-timer-demo/
  
### UI

##### Dependencies
-Node.js 
-Express
-Alchemy

## Development 
Alchemy
```sh 
// Web3 Library
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(
    "https://eth-mainnet.alchemapi.io/v2/<api-key>"
    );
// Check latest block number on the Ethereum mainnet
const blockNumber = await web3.eth.getBlockNumber();
console.log("The latest block number is " + blockNumber);
```

## NFT Development

### NFT API 
```sh
Get all the NFT's owned y an address
const nfts = await web3.alchemy.getNfts({
    owner: "0xC3---------------------------------1061"
});
console.log(nfts);

// Output of the log of owned NFTs
{
    "ownedNfts":[
        {
            "contract": {
                "address": ""
            },
            "id":{
                "tokenId":"28",
            },
            "title": "Duskbreaker #28",
            "description": "Breakers ...",
            "tokenUri*: {
                "raw": "https://duskbreakers/",
                "gateway": "https://duskbreakers/"
            }
        }
    ]
}
//////////// 
window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0x89",
        rpcUrls: ["https://rpc-mainnet.matic.network/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]
        }]
});

//////////////////// Optimistic UI Patterns
const contractAddress = 'address of deployed contract';
const contractABI = abi.abi

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const lugiaBattleContract =new ethers.Contract(contractAddress, contractABI, signer);

```
### Blockchain Technologies 
| Fx | Tools | URLS |
|-----------------|:-----------------:|---------:|
| Web3 Network | Rainbowkit + Polygon Mumbai  | []  | 
| Web3 Platform | Alchemy | [] |
| UI| React/React router |  [] |  
 
 
### Dependencies
 
#### CDNs
 
### Database: 
 
###  server-nginx
* located in server-nginx/README.md 

 
### Methods 3rd Party Libraries
 
#### React  Sample Methods
```sh
console.log(React)
{Children: {…}, createRef: ƒ, Component: ƒ, PureComponent: ƒ, createContext: ƒ, …}
    Children: {map: ƒ, forEach: ƒ, count: ƒ, toArray: ƒ, only: ƒ}
    Component: ƒ r(a, b, d)
    length: 3
    name: "r"
    prototype:
    forceUpdate: ƒ (a)
    isReactComponent: {}
    setState: ƒ (a, b)
    constructor: ƒ r(a, b, d)
    [[Prototype]]: Object
    arguments: (...)
    caller: (...)
    [[FunctionLocation]]: app-react.js:55
    [[Prototype]]: ƒ ()
    [[Scopes]]: Scopes[2]
    Fragment: Symbol(react.fragment)
    PureComponent: ƒ M(a, b, d) 
 StrictMode: Symbol(react.strict_mode)
    Suspense: Symbol(react.suspense)
    cloneElement: ƒ (a, b, d)
    createContext: ƒ (a, b)
    createElement: ƒ da(a, b, d)
    createFactory: ƒ (a)
    createRef: ƒ ()
    forwardRef: ƒ (a)
    isValidElement: ƒ R(a)
    lazy: ƒ (a)
    memo: ƒ (a, b)
    unstable_ConcurrentMode: Symbol(react.concurrent_mode)
    unstable_Profiler: Symbol(react.profiler)
    version: "16.7.0"
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {ReactCurrentOwner: {…}, Scheduler: {…}, SchedulerTracing: {…}, assign: ƒ}
    [[Prototype]]: Object
    constructor: ƒ Object()
    assign: ƒ assign()
    create: ƒ create()
    defineProperties: ƒ defineProperties()
    defineProperty: ƒ defineProperty()
    entries: ƒ entries()
    freeze: ƒ freeze()
    fromEntries: ƒ fromEntries()
```

 
<a style="margin-left:20%;" href="https://cryptomaven.xyz">

<img width="660" src="https://tmm-nov.s3.amazonaws.com/assets/img/MaestasReykjavikBanner.jpg" title="Crypto_Maven_Background" alt="Crypto_Maven_Image_Background">

</a>


<h3 width="600" style="margin-left:50px;max-width:560px;font-style:italic;no-wrap">"Pleiades are a group of more than 800 stars located about 410 light-years from Earth in the constellation Taurus."</h3> 

### API SCHEMAS
 
### About the Author: 
```
Thomas Milton Maestas, your Author. 
```
Je me spécialise dans les dernières technologies full-stack, notamment React/Redux 18, TypeScript et Java 8/11, avec une compréhension de niveau Master de l'analyse et de la visualisation des données. J'ai 7 ans d'expérience avec les frameworks Web, les bibliothèques, les coureurs de tâches Webpack et la maîtrise complète d'AWS, y compris les bases de données sans serveur et les fonctions lambda. Mon expérience en analyse de données comprend à la fois des analyses qualitatives et quantitatives, en utilisant R, Python et JavaScript. Les bases de données incluent MySQL, PostgreSQL et Oracle ; AWS DynamoDB et MongoDB, à l'aide de la gestion relationnelle d'objets non relationnels Sequelize. Méthodologie Agile/SCRUM.

I specialize in the latest full-stack technologies including React/Redux 18, TypeScript & Java 8/11; this, along with a Masters-level understanding of data analytics and visualization. I have  7 years of experience with web frameworks, libraries, webpack task-runners and AWS proficiency, based on 3 AWS certifications, including serverless database & lambda functions. My data analysis experience includes both qualitative and quantitative analytics,using R, Python, and JavaScript.  Databases include MySQL, PostgreSQL, and Oracle; along with AWS DynamoDB and MongoDB, using Sequelize non-relational Object Relational Management. Agile/SCRUM Methodology. 

#### WRITING

{  
  Name     : "Thomas Milton Maestas", 
  Title    : "Software Developer",
  Email    : "thomas.maestas@hotmail.com", 
  URL      : [ "thomasmaestas.net", "ourdailytech.net"],
  Company  : "TMM",  
  Media    : {   
    linkedIn : "linkedin.com/in/thomasmaestas", 
    github   : "github.com/thomasm1"
    }
}  