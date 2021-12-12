/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration
let Web3 = require("web3");
const EthereumTransaction = require("ethereumjs-tx").Transaction;
const privateKeySenderHex = Buffer.from('PVT_KEY', 'hex');

const testnet = `https://rinkeby.infura.io/v3/API_KEY`;
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );

web3.eth.defaultChain = 'rinkeby';


// -- Step 2: Set the sending and receiving addresses for the transaction.
let sendingAddress = '0x5fB3Bc5102496A7906498EC8b9C45bB6497feb79'
let receivingAddress = '0x11A9B1fbEfB316F7bf27bb647d00114feC5b7B94'

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
// let rawTransaction = {
//     nonce: '0x0', to: receivingAddress,
//     gasPrice: '0x1312D00',
//     gasLimit: '0x7530',
//     value: '0x1E848',
//     data: '0x0'
// }

const txParams = {
    nonce: '0x' + parseInt('10').toString(16),
    gasPrice: '0x' + parseInt('120000000000').toString(16),
    gasLimit: '0x' + parseInt('30000').toString(16),
    to: receivingAddress,
    value: '0x' + parseInt('1000000000000000000').toString(16),
    data: '0x' + parseInt('0').toString(16),
}

// -- Step 5: View the raw transaction rawTransaction
console.log(txParams);

// -- Step 6: Check the new account balances (they should be the same)
// web3.eth.getBalance(sendingAddress).then(console.log);
// web3.eth.getBalance(receivingAddress).then(console.log);

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender


const transaction = new EthereumTransaction(txParams, { chain: 'rinkeby', hardfork: 'petersburg' });

transaction.sign(privateKeySenderHex);

/*#########################################

Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
const serializedTransaction = transaction.serialize();
// web3.eth.sendSignedTransaction(serializedTransaction);
// web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex'));
web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'));




