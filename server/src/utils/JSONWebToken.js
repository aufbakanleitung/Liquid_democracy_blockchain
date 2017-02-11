'use strict';
var jwt = require('jsonwebtoken');
var JSONWebToken = (function () {
    function JSONWebToken(request) {
        this.decodedToken = jwt.decode(JSONWebToken.getTokenFromRequest(request));
    }
    JSONWebToken.prototype.getUsername = function () {
        return this.decodedToken ? this.decodedToken.username : null;
    };
    JSONWebToken.prototype.getUserID = function () {
        return this.decodedToken ? this.decodedToken.userID : null;
    };
    JSONWebToken.getTokenFromRequest = function (request) {
        var token = request.headers['x-access-token'];
        if (!token) {
            token = request.body ? request.body.token : null;
        }
        if (!token) {
            token = request.query ? request.query.token : null;
        }
        return token;
    };
    return JSONWebToken;
}());
exports.JSONWebToken = JSONWebToken;
