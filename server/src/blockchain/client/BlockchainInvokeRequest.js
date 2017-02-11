"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlockchainRequest_1 = require('./BlockchainRequest');
var BlockchainInvokeRequest = (function (_super) {
    __extends(BlockchainInvokeRequest, _super);
    function BlockchainInvokeRequest(chaincodeID, chaincodeFunctionName, chaincodeArguments, logger, blockchainUsername, chain) {
        _super.call(this, chaincodeID, chaincodeFunctionName, chaincodeArguments, logger, 'invoke', blockchainUsername, chain);
    }
    BlockchainInvokeRequest.prototype.doRequest = function (blockchainUser, request) {
        return blockchainUser.invoke(request);
    };
    BlockchainInvokeRequest.prototype.processResults = function (results) {
        return results;
    };
    return BlockchainInvokeRequest;
}(BlockchainRequest_1.BlockchainRequest));
exports.BlockchainInvokeRequest = BlockchainInvokeRequest;
