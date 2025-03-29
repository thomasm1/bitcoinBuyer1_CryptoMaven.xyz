// require('dotenv').config();  

import {Request, Response} from 'express';  

const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const Moralis = require("moralis").default
const { EvmChain } = require("@moralisweb3/common-evm-utils")

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req: Request, res: Response, next: () => void) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const PORT = 8887

const API_KEY =  process.env['MORALIS_API_KEY'];
const addressDEFAULT =  process.env['DEFAULT_ADDRESS'];
const chainETH = EvmChain.ETHEREUM
 

 
async function getData(address:any, chain:any) {
    // GET NATIVE BAL
    const nativeBal = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain
    })
    // Format native bal formated in ether via the .ether getter
    const native = nativeBal.result.balance.ether
    // GET TOKEN BAL
    const tokenBals = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain
})
    // Format token bal formated to readable outpu with display() method
    const tokens = tokenBals.result.map((token: { display: () => any; }) => token.display());
    // GET NFTs
    const nftBals = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        limit:10,
    })
    // Format outpu to return name, amount and metadata
    const nfts = nftBals.result.map((nft:any) => ({
    name: nft.result.name,
    amount: nft.result.amount,
    metadata: nft.result.metadata,
    }))
    return { native, tokens, nfts }
}
//////////// ROUTING ////////////////////////////////////////////////////////////////////

app.get("/nft", async(req:Request, res:Response) => {

try {
    
    const address = req.query['address'] || addressDEFAULT;
    const chain = req.query['chain'] || chainETH;
    const data = await getData(address, chain)    
    res.status(200)
    res.json(data)
} catch (error) {
    console.log(error);
    res.status(500)
    res.json({error: "error.500" })
}
})
app.post("/nft/eth", async(req:Request, res:Response) => { 
    const address = req.body.address;
    if(!address || address.length !== 42) {
        res.status(400);
        res.json({error: "Invalid address" });
    }; 
    // multi-chain support later TODO
    const chain = chainETH;
    try {
        const data  = await getData(address, chain);
        res.status(200)
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500)
        res.json({error: "error.500" })
    }
    })
app.get("/nft/eth/:address", async(req:Request, res:Response) => { 
    const address = req.params['address'];  
    if(!address || address.length !== 42) {
        res.status(400);
        res.json({error: "Invalid address" });
    }; 
    // multi-chain support later TODO
    const chain = chainETH;
    try {
        const data  = await getData(address, chain);
        res.status(200)
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500)
        res.json({error: "error.500" })
    }
    })
// const startServer = async() => {
//     await Moralis.start({
//         apiKey: API_KEY,
//     })
//     app.listen(PORT, () => {
//         console.log(`Example app listening at http://localhost:${PORT}`)
//     })
// }
// startServer();
    