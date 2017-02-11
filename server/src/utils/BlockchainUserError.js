"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlockchainUserError = (function (_super) {
    __extends(BlockchainUserError, _super);
    function BlockchainUserError(message) {
        _super.call(this, message);
    }
    return BlockchainUserError;
}(Error));
exports.BlockchainUserError = BlockchainUserError;
