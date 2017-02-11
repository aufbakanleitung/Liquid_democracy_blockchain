"use strict";
var crypto = require('crypto');
var Password = (function () {
    function Password(password, salt) {
        this.password = password;
        this.salt = salt;
    }
    Password.prototype.toHash = function () {
        return crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, 'sha256').toString('hex');
    };
    return Password;
}());
exports.Password = Password;
