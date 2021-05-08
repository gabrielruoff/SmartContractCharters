"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const version = require('../../package.json').version;
function methods() {
    return {
        web3_clientVersion: this.web3_clientVersion.bind(this),
        eth_protocolVersion: this.eth_protocolVersion.bind(this),
        eth_syncing: this.eth_syncing.bind(this),
        eth_mining: this.eth_mining.bind(this),
        eth_hashrate: this.eth_hashrate.bind(this),
        web3_sha3: this.web3_sha3.bind(this),
        eth_getCompilers: this.eth_getCompilers.bind(this),
        eth_compileSolidity: this.eth_compileSolidity.bind(this),
        eth_compileLLL: this.eth_compileLLL.bind(this),
        eth_compileSerpent: this.eth_compileSerpent.bind(this)
    };
}
exports.methods = methods;
function web3_clientVersion(payload, cb) {
    cb(null, 'Remix Simulator/' + version);
}
exports.web3_clientVersion = web3_clientVersion;
function eth_protocolVersion(payload, cb) {
    cb(null, '0x3f');
}
exports.eth_protocolVersion = eth_protocolVersion;
function eth_syncing(payload, cb) {
    cb(null, false);
}
exports.eth_syncing = eth_syncing;
function eth_mining(payload, cb) {
    // TODO: should depend on the state
    cb(null, false);
}
exports.eth_mining = eth_mining;
function eth_hashrate(payload, cb) {
    cb(null, '0x0');
}
exports.eth_hashrate = eth_hashrate;
function web3_sha3(payload, cb) {
    const str = payload.params[0];
    cb(null, web3_1.default.utils.sha3(str));
}
exports.web3_sha3 = web3_sha3;
function eth_getCompilers(payload, cb) {
    cb(null, []);
}
exports.eth_getCompilers = eth_getCompilers;
function eth_compileSolidity(payload, cb) {
    cb(null, 'unsupported');
}
exports.eth_compileSolidity = eth_compileSolidity;
function eth_compileLLL(payload, cb) {
    cb(null, 'unsupported');
}
exports.eth_compileLLL = eth_compileLLL;
function eth_compileSerpent(payload, cb) {
    cb(null, 'unsupported');
}
exports.eth_compileSerpent = eth_compileSerpent;
//# sourceMappingURL=misc.js.map