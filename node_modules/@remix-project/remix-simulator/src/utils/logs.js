'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ansi_gray_1 = tslib_1.__importDefault(require("ansi-gray"));
const time_stamp_1 = tslib_1.__importDefault(require("time-stamp"));
const color_support_1 = tslib_1.__importDefault(require("color-support"));
function hasFlag(flag) {
    return ((typeof (process) !== 'undefined') && (process.argv.indexOf('--' + flag) !== -1));
}
function addColor(str) {
    if (this.hasFlag('no-color')) {
        return str;
    }
    if (this.hasFlag('color')) {
        return ansi_gray_1.default(str);
    }
    if (color_support_1.default()) {
        return ansi_gray_1.default(str);
    }
    return str;
}
function stdout(arg) {
    if (typeof (process) === 'undefined' || !process.stdout)
        return;
    process.stdout.write(arg);
}
function stderr(arg) {
    if (typeof (process) === 'undefined' || process.stderr)
        return;
    process.stderr.write(arg);
}
function getTimestamp() {
    const coloredTimestamp = this.addColor(time_stamp_1.default('HH:mm:ss'));
    return '[' + coloredTimestamp + ']';
}
function log(...args) {
    const time = this.getTimestamp();
    this.stdout(time + ' ');
    console.log(args);
    return this;
}
exports.log = log;
function info(...args) {
    const time = this.getTimestamp();
    this.stdout(time + ' ');
    console.info(args);
    return this;
}
exports.info = info;
function dir(...args) {
    const time = this.getTimestamp();
    this.stdout(time + ' ');
    console.dir(args);
    return this;
}
exports.dir = dir;
function warn(...args) {
    const time = this.getTimestamp();
    this.stderr(time + ' ');
    console.warn(args);
    return this;
}
exports.warn = warn;
function error(...args) {
    const time = this.getTimestamp();
    this.stderr(time + ' ');
    console.error(args);
    return this;
}
exports.error = error;
//# sourceMappingURL=logs.js.map