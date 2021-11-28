'use strict'

const {Transaction} = require('../models/transactions')
const {Blockchain} = require('../models/blockchain')

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e1a9f8ecb825b48bf77d36206a34bec58bf9de6f3127ec4fe90c2a7b6f758f1d');
const myWalletAddress = myKey.getPublic('hex');

let runeCoins = new Blockchain();

const tnx_1 = new Transaction(myWalletAddress, 'public-key-address-2', 10);
tnx_1.signTransaction(myKey);
runeCoins.addTransaction(tnx_1)

// runeCoins.addTransaction(new Transaction('address_1','address_2',100));
// runeCoins.addTransaction(new Transaction('address_2','address_1',50));

console.log('\n Starting the miner 1...')
runeCoins.minePendingTransactions(myWalletAddress)

console.log('\n Balance of run-address is ',runeCoins.getBalanceOfAddress(myWalletAddress));

// console.log('\n Starting the miner 2...')
// runeCoins.minePendingTransactions('rune-address')

// console.log('\n Balance of run-address is ',runeCoins.getBalanceOfAddress('rune-address'));

///////////////////////////////////////////////Early testing on setup
// let counter = 10;

// for (let i = 1; i < counter; i++) {
//     runeCoins.addTransaction(new Transaction(`address_${i-1}`,`address_${i}`,(i*10)));
//     runeCoins.minePendingTransactions('rune-address')
// }

console.log("Valid Block = "+runeCoins.isBlockChainValid())

// // runeCoins.chain[3].transactions = 'Hello'
// runeCoins.chain[1].transactions[0].amount = 1

// console.log("Valid Block = "+runeCoins.isBlockChainValid())
// // console.log(JSON.stringify(runeCoins, null, 4))

// console.log('\n Balance of run-address is ',runeCoins.getBalanceOfAddress('rune-address'));
