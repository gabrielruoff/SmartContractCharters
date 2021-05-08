export declare class Debug {
    executionContext: any;
    constructor(executionContext: any);
    methods(): {
        debug_traceTransaction: any;
        debug_preimage: any;
        debug_storageRangeAt: any;
    };
    debug_traceTransaction(payload: any, cb: any): void;
    debug_preimage(payload: any, cb: any): void;
    debug_storageRangeAt(payload: any, cb: any): void;
}
