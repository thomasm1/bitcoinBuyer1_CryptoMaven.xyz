import * as crypto from 'crypto';

class Transaction {
    constructor(
        public amount: number,
        public payer: string, // public key
        public payee: string, //    "
        ) {}

        toString() {
            return JSON.stringify(this);
        }
}

class Block { // CONTAINER for multiple transactions
    constructor(
        public prevHash: string,
        public transaction: Transaction,
        public ts = Date.now()
    ) {}

    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');//Secure Hash Alg, 256 bits - one-way encrypt only
        hash.update(str).end();
        return hash.digest('hex');

    }
}

class Chain {
    public static instance = new Chain(); //singleton instance
    

}

class Wallet {

}