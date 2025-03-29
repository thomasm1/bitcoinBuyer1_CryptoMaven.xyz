import fs from "node:fs/promises";
export async function getAllChains(req, res) {
    //  res.status(200).json({data:Object.values(CHAINS)});
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const fileContent = await fs.readFile("./data/json/chains.json", "utf-8");
    const chains = JSON.parse(fileContent);
    res.status(200).json({ chain: chains });
}
export async function getChainById(req, res) {
    if (!req.params["id"]) {
        if (!req.body.chainId) {
            res.status(400).json({ error: "chainId is required" });
            return;
        }
        else {
            this.chainId = req.params["id"];
        }
    }
    else {
        this.chainId = req.body.chainId;
        console.log("Getting chain ", this.chainId);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const fileContent = await fs.readFile("./data/json/chains.json", "utf-8");
    const chains = JSON.parse(fileContent);
    // const chains: any = Object.values(CHAINS); 
    const chain = chains.find((chain) => chain.id == +this.chainId);
    res.status(200).json(chain);
}
export async function saveChain(req, res) {
    let chainId = "", chain = {};
    if (!req.body?.chainId) {
        const fileContent = await fs.readFile("./data/json/chains.json", "utf-8");
        const data = JSON.parse(fileContent);
        let idCount = data.length + 1;
        this.chainId = idCount.toString();
        console.log("Saving new chain", this.chainId);
    }
    else {
        this.chainId = req.body.chainId;
        console.log("Saving new chain", this.chainId);
    }
    this.changes = req.body;
    console.log("Saving new chain", this.chainId, JSON.stringify(this.chain));
    //   const chainId = req.body.chainId;
    const userChainsFileContent = await fs.readFile("./data/json/user-chains.json", "utf-8");
    const userChainData = JSON.parse(userChainsFileContent);
    let updatedUserChains = userChainData;
    if (!userChainData.some((p) => p.id === chain.id)) {
        updatedUserChains = [...userChainData, chain];
    }
    await fs.writeFile("./data/json/chains.json", JSON.stringify(updatedUserChains));
    res.status(200).json({ chain: updatedUserChains });
    // setTimeout(() => {
    //     res.status(200).json(CHAINS[id]);
    // }, 1000);  // SPINNER TODO THEN REMOVE
}
;
export async function updateChain(req, res) {
    let chainId = "", changes = {};
    if (!req.params["id"]) {
        if (!req.body.chainId) {
            res.status(400).json({ error: "chainId is required" });
            return;
        }
        else {
            this.chainId = req.params["id"], this.changes = req.body;
        }
    }
    else {
        this.chainId = req.body.chainId, this.changes = req.body;
        console.log("Saving new chain", this.chainId, JSON.stringify(this.changes));
    }
    //   const chainId = req.body.chainId;
    const fileContent = await fs.readFile("./data/json/chains.json", "utf-8");
    const data = JSON.parse(fileContent);
    const chain = data.find((d) => d.id === this.chainId);
    const userChainsFileContent = await fs.readFile("./data/json/user-chains.json", "utf-8");
    const userChainData = JSON.parse(userChainsFileContent);
    let updatedUserChains = userChainData;
    if (!userChainData.some((p) => p.id === chain.id)) {
        updatedUserChains = [...userChainData, chain];
    }
    await fs.writeFile("./data/json/chains.json", JSON.stringify(updatedUserChains));
    res.status(200).json({ chain: updatedUserChains });
    // setTimeout(() => {
    //     res.status(200).json(CHAINS[id]);
    // }, 1000);  // SPINNER TODO THEN REMOVE
}
;
export async function deleteChain(req, res) {
    let chainId = "";
    if (!req.params["id"]) {
        if (!req.body.chainId) {
            res.status(400).json({ error: "chainId is required" });
            return;
        }
        else {
            this.chainId = req.params["id"];
        }
    }
    else {
        this.chainId = req.body.chainId;
        console.log("Deleting chain ", this.chainId);
    }
    const userChainsFileContent = await fs.readFile("./data/json/chains.json", "utf-8");
    const userChainData = JSON.parse(userChainsFileContent);
    const placeIndex = userChainData.findIndex((d) => d.id === this.chainId);
    let updatedUserChains = userChainData;
    if (placeIndex >= 0) {
        updatedUserChains.splice(placeIndex, 1);
    }
    await fs.writeFile("./data/json/chains.json", JSON.stringify(updatedUserChains));
    res.status(200).json({ chain: updatedUserChains });
}
//# sourceMappingURL=chains.route.js.map