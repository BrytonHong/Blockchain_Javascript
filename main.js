'use strict'
const SHA256 = require('crypto-js/sha256');
let currentDate = new Date();

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, currentDate.setDate(currentDate.getDate() + 7), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isBlockChainValid() {

        for (let bc = 1; bc < this.chain.length; bc++) {
            const currentBlock = this.chain[bc];
            const previousBlock = this.chain[bc - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }

        }

        return true;

    }

}

let runeCoins = new Blockchain();
let counter = 10;

for (let i = 1; i < counter; i++) {
    runeCoins.addBlock(new Block(i, currentDate.setDate(currentDate.getDate() + (i * 2)), { amount: (i * 10) }));
}

// console.log("Valid Block = "+runeCoins.isBlockChainValid())

// runeCoins.chain[3].data = 'Hello'
// runeCoins.chain[3].hash = runeCoins.chain[3].calculateHash()

// console.log("Valid Block = "+runeCoins.isBlockChainValid())
// console.log(JSON.stringify(runeCoins, null, 4))

