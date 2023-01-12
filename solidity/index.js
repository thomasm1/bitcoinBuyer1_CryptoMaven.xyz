require('dotenv').config();
console.log(process.env); ////////////////////
const express = require("express")
const Moralis = require("moralis").default
const { EvmChain } = require("@moralisweb3/evm-utils")

const app = express()
const PORT = 8888

const API_KEY =  process.env.MORALIS_API_KEY;
const address =  process.env.DEFAULT_ADDRESS;
const chain = EvmChain.ETHEREUM

async function getData() {
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
    const tokens = tokenBals.result.map((token) => token.display());
    // GET NFTs
    const nftBals = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        limit:10,
    })
    // Format outpu to return name, amount and metadata
    const nfts = nftBals.result.map((nft) => ({
    name: nft.result.name,
    amount: nft.result.amount,
    metadata: nft.result.metadata,
    }))
    return { native, tokens, nfts }
}
app.get("/nft", async(req, res) => {

try {const data  = await getData()
    res.status(200)
    res.json(data)
} catch (error) {
    console.log(error);
    res.status(500)
    res.json({error: error.message })
}
})

const startServer = async() => {
    await Moralis.start({
        apiKey: API_KEY,
    })
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })
}
startServer();
    