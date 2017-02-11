"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var routing_controllers_1 = require('routing-controllers');
var config_1 = require('../config');
var jwt = require('jsonwebtoken');
var JSONWebToken_1 = require('../utils/JSONWebToken');
var UserAuthenticatorMiddleware = (function () {
    function UserAuthenticatorMiddleware() {
    }
    UserAuthenticatorMiddleware.prototype.use = function (request, response, next) {
        var _this = this;
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        var token = JSONWebToken_1.JSONWebToken.getTokenFromRequest(request);
        if (!token) {
            return this.failAuthentication(response, 'No token provided.');
        }
        jwt.verify(token, new config_1.Config().getSecret(), function (err, decoded) {
            if (err) {
                return _this.failAuthentication(response, 'Failed to authenticate token.');
            }
            next();
        });
    };
    UserAuthenticatorMiddleware.prototype.failAuthentication = function (response, message) {
        response.status(403).json({
            success: false,
            message: message
        });
    };
    UserAuthenticatorMiddleware = __decorate([
        routing_controllers_1.Middleware()
    ], UserAuthenticatorMiddleware);
    return UserAuthenticatorMiddleware;
}());
exports.UserAuthenticatorMiddleware = UserAuthenticatorMiddleware;
