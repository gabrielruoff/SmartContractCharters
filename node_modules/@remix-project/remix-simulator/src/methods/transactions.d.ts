export declare class Transactions {
    executionContext: any;
    accounts: any;
    constructor(executionContext: any);
    init(accounts: any): void;
    methods(): {
        eth_sendTransaction: any;
        eth_getTransactionReceipt: any;
        eth_getCode: any;
        eth_call: any;
        eth_estimateGas: any;
        eth_getTransactionCount: any;
        eth_getTransactionByHash: any;
        eth_getTransactionByBlockHashAndIndex: any;
        eth_getTransactionByBlockNumberAndIndex: any;
    };
    eth_sendTransaction(payload: any, cb: any): void;
    eth_getTransactionReceipt(payload: any, cb: any): void;
    eth_estimateGas(payload: any, cb: any): void;
    eth_getCode(payload: any, cb: any): void;
    eth_call(payload: any, cb: any): void;
    eth_getTransactionCount(payload: any, cb: any): void;
    eth_getTransactionByHash(payload: any, cb: any): void;
    eth_getTransactionByBlockHashAndIndex(payload: any, cb: any): void;
    eth_getTransactionByBlockNumberAndIndex(payload: any, cb: any): void;
}
