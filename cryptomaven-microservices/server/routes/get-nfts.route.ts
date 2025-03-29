import { Request, Response } from 'express';
import { NFT_ETH, NFT_POLY, NFTS_ETHEREUM, NFTS_POLYGON, NFT_REFS } from "../data/db-data.js";

export function getNft(req: Request, res: Response) {
    res.status(200).json(NFT_ETH);
}
export function postNft(req: Request, res: Response) {
    res.status(200).json(NFT_POLY);
}

export function postNfts(req: Request, res: Response) {

    const data = req.body;
    let address = data.address;
    let chain = data.chain;
    let NFTS = [];
    let NFT_REFS = {};

    if (chain == "POLYGON".toLowerCase()) {
        NFTS = NFTS_POLYGON;
    } else if (chain == "ETHEREUM".toLowerCase()) {
        NFTS = NFTS_ETHEREUM;
    } else {
        res.status(400).json({ error: "Invalid chain" });
    }

    for (let i = 0; i < NFTS.length; i++) {
        // var add = req.body.address;
        if (NFTS[i].hasOwnProperty(address)) {

            // console.log(req.body["address"]);
            res.status(200).json(NFTS[i][address]);

        }
    }
}




export function getNftData(req: Request, res: Response) {

    // res.status(200).json(NFT_ETH);
}
export function postNftData(req: Request, res: Response) {

    // res.status(200).json(NFT_POLY);
}