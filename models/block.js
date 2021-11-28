'use strict'

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateBlockHash();
        this.nonce = 0;
    }

    calculateBlockHash() {
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
    }

    // generateString(length) {
    //     const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for ( let i = 0; i < length; i++ ) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }

    //     return result;
    // }

    mineBlock(difficulty) {

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateBlockHash()
        }
    }

    blockHasValidTransaction(){
        for(const blockTnx of this.transactions){
            if(!blockTnx.isTransactionValid()){
                return false;
            }
        }

        return true;
    }

}

module.exports.Block = Block;