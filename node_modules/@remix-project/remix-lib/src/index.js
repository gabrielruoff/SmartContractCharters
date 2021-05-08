"use strict";
const tslib_1 = require("tslib");
const eventManager_1 = require("./eventManager");
const uiHelper = tslib_1.__importStar(require("./helpers/uiHelper"));
const compilerHelper = tslib_1.__importStar(require("./helpers/compilerHelper"));
const util = tslib_1.__importStar(require("./util"));
const web3Providers_1 = require("./web3Provider/web3Providers");
const dummyProvider_1 = require("./web3Provider/dummyProvider");
const web3VmProvider_1 = require("./web3Provider/web3VmProvider");
const storage_1 = require("./storage");
const eventsDecoder_1 = require("./execution/eventsDecoder");
const txExecution = tslib_1.__importStar(require("./execution/txExecution"));
const txHelper = tslib_1.__importStar(require("./execution/txHelper"));
const txFormat = tslib_1.__importStar(require("./execution/txFormat"));
const txListener_1 = require("./execution/txListener");
const txRunner_1 = require("./execution/txRunner");
const execution_context_1 = require("./execution/execution-context");
const typeConversion = tslib_1.__importStar(require("./execution/typeConversion"));
const universalDapp_1 = require("./universalDapp");
function modules() {
    return {
        EventManager: eventManager_1.EventManager,
        helpers: {
            ui: uiHelper,
            compiler: compilerHelper
        },
        vm: {
            Web3Providers: web3Providers_1.Web3Providers,
            DummyProvider: dummyProvider_1.DummyProvider,
            Web3VMProvider: web3VmProvider_1.Web3VmProvider
        },
        Storage: storage_1.Storage,
        util: util,
        execution: {
            EventsDecoder: eventsDecoder_1.EventsDecoder,
            txExecution: txExecution,
            txHelper: txHelper,
            executionContext: new execution_context_1.ExecutionContext(),
            txFormat: txFormat,
            txListener: txListener_1.TxListener,
            txRunner: txRunner_1.TxRunner,
            typeConversion: typeConversion
        },
        UniversalDApp: universalDapp_1.UniversalDApp
    };
}
module.exports = modules();
//# sourceMappingURL=index.js.map