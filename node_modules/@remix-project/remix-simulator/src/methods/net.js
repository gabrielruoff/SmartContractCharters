"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function methods() {
    return {
        net_version: this.net_version,
        net_listening: this.net_listening,
        net_peerCount: this.net_peerCount
    };
}
exports.methods = methods;
function net_version(payload, cb) {
    // should be configured networkId
    cb(null, 1337);
}
exports.net_version = net_version;
function net_listening(payload, cb) {
    cb(null, true);
}
exports.net_listening = net_listening;
function net_peerCount(payload, cb) {
    cb(null, 0);
}
exports.net_peerCount = net_peerCount;
//# sourceMappingURL=net.js.map