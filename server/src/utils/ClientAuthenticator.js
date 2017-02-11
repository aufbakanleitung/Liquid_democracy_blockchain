"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Password_1 = require('./Password');
var UserAuthenticator_1 = require('./UserAuthenticator');
var BlockchainUserError_1 = require('./BlockchainUserError');
var ClientAuthenticator = (function () {
    function ClientAuthenticator(logger, username, password, blockchainClient) {
        this.logger = logger;
        this.username = username;
        this.password = password;
        this.blockchainClient = blockchainClient;
    }
    ClientAuthenticator.prototype.authenticate = function () {
        return __awaiter(this, void 0, Promise, function* () {
            this.logger.debug('Login attempt with username: ', this.username);
            var user;
            try {
                user = yield this.blockchainClient.query('getUser', [this.username], this.username);
            }
            catch (error) {
                if (typeof error === typeof BlockchainUserError_1.BlockchainUserError) {
                    return {
                        success: false,
                        message: 'Authentication failed. User or password is incorrect.'
                    };
                }
            }
            if (!user) {
                console.log('not client error');
                return {
                    success: false,
                    message: 'Authentication failed. User or password is incorrect.'
                };
            }
            var args = [this.username, new Password_1.Password(this.password, user.salt).toHash()];
            var authenticationResultClient = yield this.blockchainClient.query('authenticateAsUser', args, this.username);
            if (!authenticationResultClient.Authenticated || !authenticationResultClient.User) {
                return {
                    success: false,
                    message: 'Authentication failed. User or password is incorrect.'
                };
            }
            if (!new UserAuthenticator_1.UserAuthenticator().validPassword(authenticationResultClient.User, this.password)) {
                return {
                    success: false,
                    message: 'Authentication failed. User or password is incorrect.'
                };
            }
            return {
                success: authenticationResultClient.Authenticated,
                message: null,
                token: new UserAuthenticator_1.UserAuthenticator().generateToken(authenticationResultClient.User),
                user: authenticationResultClient.User
            };
        });
    };
    return ClientAuthenticator;
}());
exports.ClientAuthenticator = ClientAuthenticator;
