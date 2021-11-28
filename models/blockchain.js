'use strict'

const {Block} = require("./block");
const {Transaction} = require("./transactions");

let currentDate = new Date();

class Blockchain {
    constructor() {
        this.difficulty = 2;
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(currentDate, ["Genesis Block"], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     // newBlock.hash = newBlock.calculateBlockHash();
    //     newBlock.mineBlock(this.difficulty); 
    //     this.chain.push(newBlock);
    // }

    minePendingTransactions(miningRewardAddress) {
        
        const rewardTnx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTnx);
    
        let block = new Block(currentDate, this.pendingTransactions);
        block.mineBlock(this.difficulty);
        block.previousHash = this.getLatestBlock().hash;
        block.hash = block.calculateBlockHash();
        console.log("Block Successfully mined");

        this.chain.push(block);
        this.pendingTransactions = []
        console.log()
    }

    addTransaction(transaction) {

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error("Transaction must have from/to address");
        }

        if(!transaction.isTransactionValid()){
            throw new Error("Transaction is not valid");
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {

                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }

            }
        }

        return balance;

    }

    isBlockChainValid() {

        for (let bc = 1; bc < this.chain.length; bc++) {
            const currentBlock = this.chain[bc];
            const previousBlock = this.chain[bc - 1];

            if(!currentBlock.blockHasValidTransaction()){
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateBlockHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }

        }

        return true;

    }

}

module.exports.Blockchain = Blockchain;