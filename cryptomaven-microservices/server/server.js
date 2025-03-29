import Moralis from "moralis";
import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import * as chains from './data/db-constants.js';
import * as test from './data/db-data.js';
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const httpsOptions = { 
//   key: fs.readFileSync('/etc/letsencrypt/live/cryptomaven.xyz/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/cryptomaven.xyz/fullchain.pem')
// };
///////// TEST DATA METHODS
import { getAllChains, getChainById } from "./routes/chains.route.js";
import { getAllCoins, getCoinById } from "./routes/coins.route.js";
import { searchAddresses, getAddresses, getAddressesByName } from "./routes/addresses.route.js";
// searchAddressesByCategory 
import { saveChain } from './routes/chains.route.js';
import { postLogin, getUsers, getUserById, } from './routes/get-users.route.js';
import { getOpenai } from './routes/openai.route.js';
import { getNft, postNft, postNfts, } from './routes/get-nfts.route.js';
/////// LIVE DATA METHODS
import { getDataController } from './controllers/getDataController.js';
/////////////// CONSTANTS
const PORT = 9000;
const API_KEY = process.env["MORALIS_API_KEY"];
let chain = process.env["DEFAULT_CHAIN"] || 'ETHEREUM';
const addressDEFAULT = process.env["DEFAULT_ADDRESS"];
//// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("images"));
/// ROUTING 
/// CHAINS
app.route('/api/chains').get(getAllChains);
app.route('/api/chains/:id').get(getChainById);
/// COINS 
app.route('/api/coins').get(getAllCoins);
app.route('/api/coins/:id').get(getCoinById);
/// ADDRESSES
app.route('/api/nft-refs/:name').get(getAddressesByName);
app.route('/api/addresses').get(searchAddresses);
// app.route('/api/addresses:category').get(searchAddressesByCategory);  
app.route('/api/chains/:id').put(saveChain);
app.route('/api/login').post(postLogin);
app.route('/api/users').get(getUsers);
app.route('/api/users/email/:email').get(getUserById);
app.route('/api/addresses').get(getAddresses);
app.route('/api/nft').get(getNft);
app.route('/api/nft-post').post(postNft);
app.route('/api/nfts-test').post(postNfts);
/// open-ai stuff
// app.use('/api/openai', require('./routes/openai.route'));
app.route('/api/openai').get(getOpenai);
//// LIVE DATA ROUTES
app.get("/api/nft", async (req, res) => {
    try {
        const address = req.query['address'] || addressDEFAULT;
        chain = req.query['chain'] || chains.chainETH;
        const data = await getDataController(address, chain);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({ error: error.message });
    }
});
app.post("/api/nft-test", async (req, res) => {
    res.status(200);
    res.json(test.NFTS_ETHEREUM);
});
app.post("/api/nft", async (req, res) => {
    const address = req.body.address;
    if (!address || address.length !== 42) {
        res.status(400);
        res.json({ error: "Invalid address" });
    }
    ;
    if (!chain || chain.length < 3) {
        res.status(400);
        res.json({ error: "Invalid chain" });
    }
    ;
    try {
        switch (req.body.chain.toUpperCase()) {
            case "ETHEREUM":
                chain = chains.chainETH;
                break;
            // case "ROPSTEIN":
            //   chain = chains.chainROPSTEN; break;
            // case "RINKEBY":
            //   chain = chains.chainRINKEBY; break;
            case "GOERLI":
                chain = chains.chainGOERLI;
                break;
            case "POLYGON":
                chain = chains.chainPOLYGON;
                break;
            case "MUMBAI":
                chain = chains.chainMUMBAI;
                break;
            case "BSC":
                chain = chains.chainBSC;
                break;
            case "BNB_TEST":
                chain = chains.chainBSC_TEST;
                break;
            case "AVALANCHE":
                chain = chains.chainAVA;
                break;
            // case "FUJI":
            //   chain = chains.chainFUJI; break;
            case "FANTOM":
                chain = chains.chainFANTOM;
                break;
            case "ARBITRUM":
                chain = chains.chainARBITRUM;
                break;
            // case "PULSECHAIN":
            //   chain = chains.chainPULSECHAIN; break;
            default:
                res.status(400);
                res.json({ error: "chain not supported" });
        }
        const data = await getDataController(address, chain);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({ error: error.message });
    }
});
app.get("api/nft/eth/:address", async (req, res) => {
    const address = req.params.address;
    if (!address || address.length !== 42) {
        res.status(400);
        res.json({ error: "Invalid address" });
    }
    ;
    // multi-chain support later TODO
    const chain = chains.chainETH;
    try {
        const data = await getDataController(address, chain);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({ error: error.message });
    }
});
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    res.status(404).json({ message: "404 - Not Found" });
});
//// WEBHOOKS
const startServer = async () => {
    await Moralis.start({
        apiKey: API_KEY,
    });
    // https.createServer(httpsOptions, app).listen(PORT);
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTP REST API Server listening at http://localhost:${PORT}/api/nft`);
    });
};
startServer();
//# sourceMappingURL=server.js.map