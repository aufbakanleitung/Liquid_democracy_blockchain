'use strict';
var path = require('path');
var Config = (function () {
    function Config() {
    }
    Config.prototype.getSecret = function () {
        return 'sUp4hS3cr37kE9c0D3';
    };
    Config.getServerDirectory = function () {
        return path.join(process.cwd(), 'dist');
    };
    return Config;
}());
exports.Config = Config;
