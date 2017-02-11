"use strict";
var Password_1 = require('./Password');
var config_1 = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var UserAuthenticator = (function () {
    function UserAuthenticator() {
        this.TOKEN_LIFETIME_IN_SECONDS = 24 * 60 * 60;
    }
    UserAuthenticator.prototype.validPassword = function (user, password) {
        return new Password_1.Password(password, user.salt).toHash() === user.hash;
    };
    UserAuthenticator.prototype.generateToken = function (user) {
        return jsonwebtoken.sign(user, new config_1.Config().getSecret(), {
            expiresIn: this.TOKEN_LIFETIME_IN_SECONDS
        });
    };
    return UserAuthenticator;
}());
exports.UserAuthenticator = UserAuthenticator;
