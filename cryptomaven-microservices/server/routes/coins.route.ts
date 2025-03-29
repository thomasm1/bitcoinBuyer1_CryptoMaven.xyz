import fs from "node:fs/promises";


import {Request, Response} from 'express'; 
// import {COINS } from "../data/db-data.js";


 
export async function getAllCoins(req: Request, res: Response) {  
        //  res.status(200).json({data:Object.values(COINS)});
   await new Promise((resolve) => setTimeout(resolve, 3000)); 
   const fileContent = await fs.readFile("./data/json/coins.json", "utf-8"); 
   const coins = JSON.parse(fileContent); 

   res.status(200).json({ coin: coins }); 
}
export async function getCoinById(req: Request, res: Response) {
    if (!req.params["id"]) {
        if (!req.body.coinId) {
            res.status(400).json({ error: "coinId is required" });
            return;
        } else {
            this.coinId = req.params["id"] ;
        }
    } else {
        this.coinId = req.body.coinId ;
        console.log("Getting coin ", this.coinId );
    }
    await new Promise((resolve) => setTimeout(resolve, 3000)); 
    const fileContent = await fs.readFile("./data/json/coins.json", "utf-8"); 
    const coins = JSON.parse(fileContent); 
    // const coins: any = Object.values(CoinS); 

    const coin = coins.find((coin: { id: number; }) => coin.id == +this.coinId); 

        res.status(200).json(coin); 

} 


 


export async function updateCoin(req: Request, res: Response) {

    // const id = req.params["id"],
    //     changes = req.body;

    // console.log("Saving new coin", id, JSON.stringify(changes));


    // CoinS[id] = {
    //     ...CoinS[id],
    //     ...changes
    // };

    const coinId = req.params["id"], changes = req.body;
    //   const coinId = req.body.coinId;
    console.log("Saving new coin", coinId, JSON.stringify(changes));
    const fileContent = await fs.readFile("./data/json/coins.json", "utf-8");
    const data = JSON.parse(fileContent);

    const coin = data.find((d) => d.id === coinId);

    const userCoinsFileContent = await fs.readFile("./data/json/user-coins.json", "utf-8");
    const userCoinData = JSON.parse(userCoinsFileContent);

    let updatedUserCoins = userCoinData;

    if (!userCoinData.some((p) => p.id === coin.id)) {
        updatedUserCoins = [...userCoinData, coin];
    }

    await fs.writeFile("./data/json/coins.json",
        JSON.stringify(updatedUserCoins)
    );

    res.status(200).json({ coin: updatedUserCoins });
 

};
export async function saveCoin(req: Request, res: Response) {
  let coinId: string = "", coin: any = {};

        if (!req.body?.coinId) {
            const fileContent = await fs.readFile("./data/json/coins.json", "utf-8");
            const data = JSON.parse(fileContent);
            let idCount = data.length + 1;
            this.coinId = idCount.toString(); 
            console.log("Saving new coin", this.coinId);
        } else { 
            this.coinId = req.body.coinId ;
            console.log("Saving new coin", this.coinId );
        }  
        this.changes = req.body;
        console.log("Saving new coin", this.coinId, JSON.stringify(this.coin));       
    //   const coinId = req.body.coinId;
 

    
    const userCoinsFileContent = await fs.readFile("./data/json/user-coins.json", "utf-8");
    const userCoinData = JSON.parse(userCoinsFileContent);

    let updatedUserCoins = userCoinData;

    if (!userCoinData.some((p) => p.id === coin.id)) {
        updatedUserCoins = [...userCoinData, coin];
    }

    await fs.writeFile("./data/json/coins.json",
        JSON.stringify(updatedUserCoins)
    );

    res.status(200).json({ coin: updatedUserCoins });

 

};


export async function deleteCoin(req: Request, res: Response) {

    if (!req.params["id"]) {
        if (!req.body.coinId) {
            res.status(400).json({ error: "coinId is required" });
            return;
        } else {
            this.coinId = req.params["id"];
        }
    } else {
        this.coinId = req.body.coinId;
        console.log("Deleting coin ", this.coinId);
    }

    const userCoinsFileContent = await fs.readFile("./data/json/coins.json", "utf-8");
    const userCoinData = JSON.parse(userCoinsFileContent);

    const placeIndex = userCoinData.findIndex((d) => d.id === this.coinId);

    let updatedUserCoins = userCoinData;

    if (placeIndex >= 0) {
        updatedUserCoins.splice(placeIndex, 1);
    }

    await fs.writeFile("./data/json/coins.json",
        JSON.stringify(updatedUserCoins)
    );

    res.status(200).json({ coin: updatedUserCoins });
}