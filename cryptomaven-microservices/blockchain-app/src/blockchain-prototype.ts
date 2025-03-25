import * as sha256 from 'sha256';
const currentNodeUrl: string = process.argv[3];
 import { v1 as uuidv1 } from 'uuid';
// const uuid = require('uuid');
// const uuidv1 = uuid.v1;  // or const { v1: uuidv1 } = require('uuid');
//"nodemon --watch dev -e js dev/networkNode.js 9001 http://localhost:9001"

interface Transaction {
    amount: number;
    sender: string;
    recipient: string;
    transactionId: string;
}

interface Block {
    index: number;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: string;
    previousBlockHash: string;
}


interface Blockchain {
    chain: Block[];
    pendingTransactions: Transaction[];
    currentNodeUrl: string;
    networkNodes: string[];
  
    createNewBlock(this: Blockchain, nonce: number, previousBlockHash: string, hash: string): Block;
    getLastBlock(this: Blockchain): Block;
    createNewTransaction(this: Blockchain, amount: number, sender: string, recipient: string): Transaction;
    addTransactionToPendingTransactions(this: Blockchain, transactionObj: Transaction): number;
    hashBlock(this: Blockchain, previousBlockHash: string, currentBlockData: any, nonce: number): string;
    proofOfWork(this: Blockchain, previousBlockHash: string, currentBlockData: any): number;
    chainIsValid(this: Blockchain, blockchain: Block[]): boolean;
    getBlock(this: Blockchain, blockHash: string): Block | null;
    getTransaction(this: Blockchain, transactionId: string): { transaction: Transaction | null; block: Block | null };
    getAddressData(
      this: Blockchain,
      address: string
    ): { addressTransactions: Transaction[]; addressBalance: number };
  }
  
  // A "constructor" function using prototypes
  function Blockchain(this: Blockchain) {
    this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
  
    // Create a "genesis" block
    this.createNewBlock(100, '0', '0');
  }


Blockchain.prototype.createNewBlock = function(nonce: number, previousBlockHash: string, hash: string): Block {
    const newBlock: Block = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
};


Blockchain.prototype.getLastBlock = function(): Block {
    return this.chain[this.chain.length - 1];
};


Blockchain.prototype.createNewTransaction = function(amount: number, sender: string, recipient: string): Transaction {
    const transactionId: string = uuidv1().split('-').join('');
    const newTransaction: Transaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: transactionId
    };

    return newTransaction;
};


Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj: Transaction): number {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock().index + 1;
};


Blockchain.prototype.hashBlock = function(previousBlockHash: string, currentBlockData: any, nonce: number): string {
    const dataAsString: string = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash: string = sha256.x2(dataAsString);
    return hash;
};


Blockchain.prototype.proofOfWork = function(previousBlockHash: string, currentBlockData: any): number {
    let nonce: number = 0;
    let hash: string = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
};



Blockchain.prototype.chainIsValid = function(blockchain: Block[]): boolean {
    let validChain: boolean = true;

    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock: Block = blockchain[i];
        const prevBlock: Block = blockchain[i - 1];
        const blockHash: string = this.hashBlock(
            prevBlock.hash, 
            { transactions: currentBlock.transactions, index: currentBlock.index }, 
            currentBlock.nonce);
        if (blockHash.substring(0, 4) !== '0000') validChain = false; console.log('Invalid hash: ', blockHash);
        if (currentBlock.previousBlockHash !== prevBlock.hash) validChain = false; console.log('Invalid previousBlockHash: ', currentBlock.previousBlockHash);
    };

    const genesisBlock: Block = blockchain[0];
    const correctNonce: boolean = genesisBlock.nonce === 100;
    const correctPreviousBlockHash: boolean = genesisBlock.previousBlockHash === '0';
    const correctHash: boolean = genesisBlock.hash === '0';
    const correctTransactions: boolean = genesisBlock.transactions.length === 0;

    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;
};


Blockchain.prototype.getBlock = function(blockHash: string): Block | null {
    let correctBlock: Block | null = null;
    this.chain.forEach((block: Block): void => {
        if (block.hash === blockHash) correctBlock = block;
    });
    return correctBlock;
};


Blockchain.prototype.getTransaction = function(transactionId: string): { transaction: Transaction | null; block: Block | null } {
    let correctTransaction: Transaction | null = null;
    let correctBlock: Block | null = null;

    this.chain.forEach((block: Block): void => {
        block.transactions.forEach((transaction: Transaction): void => {
            if (transaction.transactionId === transactionId) {
                correctTransaction = transaction;
                correctBlock = block;
            }
        });
    });

    return {
        transaction: correctTransaction,
        block: correctBlock
    };
};


Blockchain.prototype.getAddressData = function(address: string): { addressTransactions: Transaction[]; addressBalance: number } {
    const addressTransactions: Transaction[] = [];
    this.chain.forEach((block: Block): void => {
        block.transactions.forEach((transaction: Transaction): void => {
            if (transaction.sender === address || transaction.recipient === address) {
                addressTransactions.push(transaction);
            }
        });
    });

    let balance: number = 0;
    addressTransactions.forEach(transaction => {
        if (transaction.recipient === address) balance += transaction.amount;
        else if (transaction.sender === address) balance -= transaction.amount;
    });

    return {
        addressTransactions: addressTransactions,
        addressBalance: balance
    };
};
 

module.exports = Blockchain;
