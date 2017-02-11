"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlockchainRequest_1 = require('./BlockchainRequest');
var BlockchainQueryRequest = (function (_super) {
    __extends(BlockchainQueryRequest, _super);
    function BlockchainQueryRequest(chaincodeID, chaincodeFunctionName, chaincodeArguments, logger, blockchainUsername, chain) {
        _super.call(this, chaincodeID, chaincodeFunctionName, chaincodeArguments, logger, 'query', blockchainUsername, chain);
    }
    BlockchainQueryRequest.prototype.doRequest = function (blockchainUser, request) {
        return blockchainUser.query(request);
    };
    BlockchainQueryRequest.prototype.processResults = function (results) {
        return JSON.parse(results.result.toString());
    };
    return BlockchainQueryRequest;
}(BlockchainRequest_1.BlockchainRequest));
exports.BlockchainQueryRequest = BlockchainQueryRequest;
