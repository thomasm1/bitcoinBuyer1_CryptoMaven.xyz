import { Request, Response } from 'express';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain-prototype');
// const uuid = require('uuid/v1');
const { v1: uuidv1 } = require('uuid'); 
const rp = require('request-promise');

const NETWORK_NODE_PORT = process.argv[2] || 9001;
const NETWORK_HOST = process;
// console.log(`⚡️ Register-Node target: https://${BUS_HOST}:${PORT_EVENT_BUS}`);

// const nodeAddress = uuid().split('-').join('');
const nodeAddress = uuidv1().split('-').join('');


const bitcoin = new Blockchain(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// GET FULL BLOCKCHAIN
interface IBlockchain {
	chain: any[];
	pendingTransactions: any[];
	networkNodes: string[];
	currentNodeUrl: string;
} 
app.get('/blockchain', function (req: Request, res: Response<IBlockchain>): void {
	res.send(bitcoin as IBlockchain);
});


// register a node and broadcast it the network
// [[API CALL]]   PORT 9001 (self) ->	"newNodeUrl": "http://localhost:9002"
interface RegisterAndBroadcastNodeRequestBody {
	newNodeUrl: string;
}
interface RegisterNodeRequestBody {
	newNodeUrl: string;
}
interface BulkRegisterBody {
	allNetworkNodes: string[];
}
interface RequestOptions {
	uri: string;
	method: string;
	body?: any;
	json: boolean;
}
app.post(
	'/register-and-broadcast-node',
	function (
		req: Request<{}, {}, RegisterAndBroadcastNodeRequestBody>,
		res: Response<{ note: string }>
	): void {
		const newNodeUrl: string = req.body.newNodeUrl;
		if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
			bitcoin.networkNodes.push(newNodeUrl);
		}

		const regNodesPromises: Promise<any>[] = [];
		bitcoin.networkNodes.forEach((networkNodeUrl: string): void => {
			const requestOptions: RequestOptions = {
				uri: networkNodeUrl + '/register-node',
				method: 'POST',
				body: { newNodeUrl: newNodeUrl } as RegisterNodeRequestBody,
				json: true
			};

			regNodesPromises.push(rp(requestOptions));
		});

		Promise.all(regNodesPromises)
			.then((data: any[]): Promise<any> => {
				const bulkRegisterOptions: RequestOptions = {
					uri: newNodeUrl + '/register-nodes-bulk',
					method: 'POST',
					body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] } as BulkRegisterBody,
					json: true
				};

				return rp(bulkRegisterOptions);
			})
			.then((data: any): void => {
				res.json({ note: `First, /register-node: ${bitcoin.currentNodeUrl}; AND, /register-nodes-bulk: array+ ${bitcoin.currentNodeUrl} registered with network successfully.` });
			});
	}
);


// REGISTER NODE with the network
// [[NETWORK CALL]]
interface RegisterNodeRequestBody {
	newNodeUrl: string;
}
interface RegisterNodeResponse {
	note: string;
}
app.post(
	'/register-node',
	function (
		req: Request<{}, {}, RegisterNodeRequestBody>,
		res: Response<RegisterNodeResponse>
	): void {
		const newNodeUrl: string = req.body.newNodeUrl;
		const nodeNotAlreadyPresent: boolean = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
		const notCurrentNode: boolean = bitcoin.currentNodeUrl !== newNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode)
			bitcoin.networkNodes.push(newNodeUrl);
		res.json({ note: 'New node registered successfully.' });
	}
);



// REGISTER MULTIPLE NODES  at once
// [[NETWORK CALL]]
interface BulkRegisterRequestBody {
	allNetworkNodes: string[];
}
interface BulkRegisterResponse {
	note: string;
}
interface INetworkNodeProcessor {
	(networkNodeUrl: string): void;
}
app.post(
	'/register-nodes-bulk',
	function (
		req: Request<{}, {}, BulkRegisterRequestBody>,
		res: Response<BulkRegisterResponse>
	): void {
		const allNetworkNodes: string[] = req.body.allNetworkNodes;

		const processNetworkNode: INetworkNodeProcessor = (networkNodeUrl: string): void => {
			const nodeNotAlreadyPresent: boolean = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1;
			const notCurrentNode: boolean = bitcoin.currentNodeUrl !== networkNodeUrl;
			if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
		};

		allNetworkNodes.forEach(processNetworkNode);

		res.json({ note: 'Bulk registration successful.' });
	}
);
 


// broadcast transaction
// [[API CALL]]   PORT 9001 (self) ->	{	"amount": 0.033332,	"sender": "SenderNumber2",	"recipient": "recipientNumber2"}
interface BroadcastTransactionRequestBody {
	amount: number;
	sender: string;
	recipient: string;
}
interface RequestOptions {
	uri: string;
	method: string;
	body?: any;
	json: boolean;
}
app.post(
	'/transaction/broadcast',
	function (
		req: Request<{}, {}, BroadcastTransactionRequestBody>,
		res: Response
	): void {
		const newTransaction = bitcoin.createNewTransaction(
			req.body.amount,
			req.body.sender,
			req.body.recipient
		);
		bitcoin.addTransactionToPendingTransactions(newTransaction);

		const requestPromises: Promise<any>[] = [];

		bitcoin.networkNodes.forEach((networkNodeUrl: string): void => {
			const requestOptions: RequestOptions = {
				uri: networkNodeUrl + '/transaction',
				method: 'POST',
				body: newTransaction,
				json: true,
			};

			requestPromises.push(rp(requestOptions));
		});

		Promise.all(requestPromises).then((data: any[]): void => {
			res.json({ note: 'Transaction created and broadcast successfully.' });
		});
	}
);


// CREATE NEW TRANSACTION
// [[NETWORK CALL]]
interface Transaction {
	amount: number;
	sender: string;
	recipient: string;
}
app.post('/transaction', function(req: Request, res: Response) {
	const newTransaction: Transaction = req.body;
	const blockIndex: number = bitcoin.addTransactionToPendingTransactions(newTransaction);
	res.json({ note: `Transaction from ${req.body.sender} of amt ${req.body.amount} will be added in block ${blockIndex}.` });
});


// mine a block
interface Block {
	hash: string;
	index: number;
	// additional properties can be added if known
}
interface CurrentBlockData {
	transactions: any[];
	index: number;
}
app.get('/mine', function (req: Request, res: Response): void {
	const lastBlock: Block = bitcoin.getLastBlock();
	const previousBlockHash: string = lastBlock.hash;
	const currentBlockData: CurrentBlockData = {
		transactions: bitcoin.pendingTransactions,
		index: lastBlock.index + 1
	};
	const nonce: number = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
	const blockHash: string = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

	const requestPromises: Promise<any>[] = [];

	bitcoin.networkNodes.forEach((networkNodeUrl: string): void => {
		const requestOptions: RequestOptions = {
			uri: networkNodeUrl + '/receive-new-block',
			method: 'POST',
			body: { newBlock: newBlock } as ReceiveNewBlockRequestBody,
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
		.then((data: any[]): Promise<any> => {
			const requestOptions: RequestOptions = {
				uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
				method: 'POST',
				body: {
					amount: 12.5,
					sender: "00",
					recipient: nodeAddress
				},
				json: true
			};

			return rp(requestOptions);
		})
		.then((data: any): void => {
			res.json({
				note: "New block mined & broadcast successfully",
				block: newBlock
			});
		});
});


// receive new block
interface Block {
	hash: string;
	index: number;
	previousBlockHash: string;
	// additional properties may be added if needed
}
interface ReceiveNewBlockRequestBody {
	newBlock: Block;
}
app.post(
	'/receive-new-block',
	function (
		req: Request<{}, {}, ReceiveNewBlockRequestBody>,
		res: Response<{ note: string; newBlock: Block }>
	): void {
		const newBlock: Block = req.body.newBlock;
		const lastBlock: Block = bitcoin.getLastBlock();
		const correctHash: boolean = lastBlock.hash === newBlock.previousBlockHash;
		const correctIndex: boolean = lastBlock.index + 1 === newBlock.index;

		if (correctHash && correctIndex) {
			bitcoin.chain.push(newBlock);
			bitcoin.pendingTransactions = [];
			res.json({
				note: 'New block received and accepted.',
				newBlock: newBlock
			});
		} else {
			res.json({
				note: 'New block rejected.',
				newBlock: newBlock
			});
		}
	}
);

// CONSENSUS
interface IConsensusResponse {
	note: string;
	chain: any[];
}
app.get('/consensus', function (req: Request, res: Response<IConsensusResponse>): void {
	const requestPromises: Promise<any>[] = [];
	bitcoin.networkNodes.forEach((networkNodeUrl: string): void => {
		const requestOptions: RequestOptions = {
			uri: networkNodeUrl + '/blockchain',
			method: 'GET',
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
		.then((blockchains: IBlockchain[]): void => {
			const currentChainLength: number = bitcoin.chain.length;
			let maxChainLength: number = currentChainLength;
			let newLongestChain: any[] | null = null;
			let newPendingTransactions: any[] | null = null;

			blockchains.forEach((blockchain: IBlockchain): void => {
				if (blockchain.chain.length > maxChainLength) {
					maxChainLength = blockchain.chain.length;
					newLongestChain = blockchain.chain;
					newPendingTransactions = blockchain.pendingTransactions;
				}
			});

			if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
				res.json({
					note: 'Current chain has not been replaced.',
					chain: bitcoin.chain
				});
			} else {
				bitcoin.chain = newLongestChain;
				bitcoin.pendingTransactions = newPendingTransactions;
				res.json({
					note: 'This chain has been replaced.',
					chain: bitcoin.chain
				});
			}
		});
});


// get block by blockHash
interface BlockParams {
	blockHash: string;
}

interface BlockResponse {
	block: Block;
}

app.get('/block/:blockHash', function (req: Request<BlockParams>, res: Response<BlockResponse>): void {
	const blockHash: string = req.params.blockHash;
	const correctBlock: Block = bitcoin.getBlock(blockHash);
	res.json({
		block: correctBlock
	});
});


// get transaction by transactionId
interface TransactionRouteParams {
	transactionId: string;
}

interface TransactionResponse {
	transaction: any;
	block: any;
}

app.get('/transaction/:transactionId', function (
	req: Request<TransactionRouteParams>,
	res: Response<TransactionResponse>
) {
	const transactionId = req.params.transactionId;
	const trasactionData = bitcoin.getTransaction(transactionId);
	res.json({
		transaction: trasactionData.transaction,
		block: trasactionData.block
	});
});


// get address by address
interface AddressRouteParams {
	address: string;
}

interface AddressDataResponse {
	addressData: any;
}

app.get(
	'/address/:address',
	function (req: Request<AddressRouteParams>, res: Response<AddressDataResponse>): void {
		const address: string = req.params.address;
		const addressData: any = bitcoin.getAddressData(address);
		res.json({
			addressData: addressData
		});
	}
);


// block explorer
interface BlockExplorerRequest extends Request {}
interface BlockExplorerResponse extends Response {}

interface SendFileOptions {
	root: string;
}

app.get('/block-explorer', function (
	req: BlockExplorerRequest,
	res: BlockExplorerResponse
): void {
	res.sendFile('./block-explorer/index.html', { root: __dirname } as SendFileOptions);
});



app.listen(NETWORK_NODE_PORT, () => {
	console.log(`⚡️[comments server]: Server is running at https://${NETWORK_HOST}:${NETWORK_NODE_PORT}`);
	// console.log(`⚡️ Register-Node target: https://${BUS_HOST}:${PORT_EVENT_BUS}`);
  });

 

