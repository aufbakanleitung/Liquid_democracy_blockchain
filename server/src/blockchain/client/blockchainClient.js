'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var BlockchainInvokeRequest_1 = require('./BlockchainInvokeRequest');
var BlockchainQueryRequest_1 = require('./BlockchainQueryRequest');
var BlockchainClient = (function () {
    function BlockchainClient(chaincodeID, chain, logger) {
        this.chaincodeID = chaincodeID;
        this.chain = chain;
        this.logger = logger;
    }
    BlockchainClient.prototype.invoke = function (chaincodeFunctionName, args, blockchainUsername) {
        return __awaiter(this, void 0, Promise, function* () {
            var invokeRequest = new BlockchainInvokeRequest_1.BlockchainInvokeRequest(this.chaincodeID, chaincodeFunctionName, args, this.logger, blockchainUsername, this.chain);
            return yield invokeRequest.getResult();
        });
    };
    BlockchainClient.prototype.query = function (chaincodeFunctionName, args, blockchainUsername) {
        return __awaiter(this, void 0, Promise, function* () {
            var queryRequest = new BlockchainQueryRequest_1.BlockchainQueryRequest(this.chaincodeID, chaincodeFunctionName, args, this.logger, blockchainUsername, this.chain);
            return yield queryRequest.getResult();
        });
    };
    return BlockchainClient;
}());
exports.BlockchainClient = BlockchainClient;
