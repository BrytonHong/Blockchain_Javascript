'use strict'

const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
let currentDate = new Date();

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateTransactionHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error("You cannot sign transactions from other wallets");
        }

        const hashTnx = this.calculateTransactionHash();
        const signTnx = signingKey.sign(hashTnx, 'base64');
        this.signature = signTnx.toDER('hex');
    }

    isTransactionValid(){
        if(this.fromAddress === null){
            return true;
        }

        if(!this.signature || this.signature.length === 0){
            throw new Error("No existing signature")
        }

        const publicKeyTnx = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKeyTnx.verify(this.calculateTransactionHash(), this.signature);
    }
}

module.exports.Transaction = Transaction;