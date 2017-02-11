"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var BlockchainUserError_1 = require('../../utils/BlockchainUserError');
var BlockchainRequest = (function () {
    function BlockchainRequest(chaincodeID, chaincodeFunctionName, chaincodeArguments, logger, queryType, blockchainUsername, chain) {
        this.chaincodeID = chaincodeID;
        this.chaincodeFunctionName = chaincodeFunctionName;
        this.chaincodeArguments = chaincodeArguments;
        this.logger = logger;
        this.queryType = queryType;
        this.blockchainUsername = blockchainUsername;
        this.chain = chain;
    }
    BlockchainRequest.prototype.getResult = function () {
        var _this = this;
        return new Promise(function (resolve, reject) __awaiter(this, void 0, void 0, function* () {
            var blockchainUser;
            try {
                blockchainUser = yield _this.getBlockchainUser(_this.blockchainUsername);
            }
            catch (error) {
                _this.logger.info('[SDK] Failed to get blockchain user "' + _this.blockchainUsername + '", reason: ', error.message);
                return reject(error);
            }
            var blockchainRequest = {
                chaincodeID: _this.chaincodeID,
                fcn: _this.chaincodeFunctionName,
                args: _this.chaincodeArguments,
                attrs: ['userID']
            };
            var transactionContext = _this.doRequest(blockchainUser, blockchainRequest);
            transactionContext.on('submitted', function (results) {
                _this.logger.info('[SDK] submitted %s: %j', _this.queryType, results);
            });
            transactionContext.on('complete', function (results) {
                var processedResults = _this.processResults(results);
                _this.logger.info('[SDK] completed %s: %j', _this.queryType, processedResults);
                resolve(processedResults);
            });
            transactionContext.on('error', function (err) {
                _this.logger.error('[SDK] error on %s: %j', _this.queryType, err);
                reject(err);
            });
        }));
    };
    BlockchainRequest.prototype.getBlockchainUser = function (userName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.chain.getUser(userName, function (err, user) {
                if (err) {
                    return reject(err);
                }
                else if (user.isEnrolled()) {
                    return resolve(user);
                }
                else {
                    return reject(new BlockchainUserError_1.BlockchainUserError('user is not yet registered and enrolled'));
                }
            });
        });
    };
    return BlockchainRequest;
}());
exports.BlockchainRequest = BlockchainRequest;
