import { EventManager } from './eventManager';
import * as uiHelper from './helpers/uiHelper';
import * as compilerHelper from './helpers/compilerHelper';
import * as util from './util';
import { Web3Providers } from './web3Provider/web3Providers';
import { DummyProvider } from './web3Provider/dummyProvider';
import { Web3VmProvider } from './web3Provider/web3VmProvider';
import { Storage } from './storage';
import { EventsDecoder } from './execution/eventsDecoder';
import * as txExecution from './execution/txExecution';
import * as txHelper from './execution/txHelper';
import * as txFormat from './execution/txFormat';
import { TxListener } from './execution/txListener';
import { TxRunner } from './execution/txRunner';
import { ExecutionContext } from './execution/execution-context';
import * as typeConversion from './execution/typeConversion';
import { UniversalDApp } from './universalDapp';
declare const _default: {
    EventManager: typeof EventManager;
    helpers: {
        ui: typeof uiHelper;
        compiler: typeof compilerHelper;
    };
    vm: {
        Web3Providers: typeof Web3Providers;
        DummyProvider: typeof DummyProvider;
        Web3VMProvider: typeof Web3VmProvider;
    };
    Storage: typeof Storage;
    util: typeof util;
    execution: {
        EventsDecoder: typeof EventsDecoder;
        txExecution: typeof txExecution;
        txHelper: typeof txHelper;
        executionContext: ExecutionContext;
        txFormat: typeof txFormat;
        txListener: typeof TxListener;
        txRunner: typeof TxRunner;
        typeConversion: typeof typeConversion;
    };
    UniversalDApp: typeof UniversalDApp;
};
export = _default;
