export declare class UniversalDApp {
    events: any;
    event: any;
    executionContext: any;
    config: any;
    txRunner: any;
    accounts: any;
    transactionContextAPI: any;
    constructor(config: any, executionContext: any);
    /** Listen on New Transaction. (Cannot be done inside constructor because txlistener doesn't exist yet) */
    startListening(txlistener: any): void;
    resetEnvironment(): void;
    resetAPI(transactionContextAPI: any): void;
    /**
     * Create a VM Account
     * @param {{privateKey: string, balance: string}} newAccount The new account to create
     */
    createVMAccount(newAccount: any): string;
    newAccount(password: any, passwordPromptCb: any, cb: any): any;
    /** Add an account to the list of account (only for Javascript VM) */
    _addAccount(privateKey: any, balance: any): void;
    /** Return the list of accounts */
    getAccounts(cb: any): Promise<unknown>;
    /** Get the balance of an address */
    getBalance(address: any, cb: any): any;
    /** Get the balance of an address, and convert wei to ether */
    getBalanceInEther(address: any, callback: any): void;
    pendingTransactionsCount(): number;
    /**
      * deploy the given contract
      *
      * @param {String} data    - data to send with the transaction ( return of txFormat.buildData(...) ).
      * @param {Function} callback    - callback.
      */
    createContract(data: any, confirmationCb: any, continueCb: any, promptCb: any, callback: any): void;
    /**
      * call the current given contract
      *
      * @param {String} to    - address of the contract to call.
      * @param {String} data    - data to send with the transaction ( return of txFormat.buildData(...) ).
      * @param {Object} funAbi    - abi definition of the function to call.
      * @param {Function} callback    - callback.
      */
    callFunction(to: any, data: any, funAbi: any, confirmationCb: any, continueCb: any, promptCb: any, callback: any): void;
    /**
      * call the current given contract
      *
      * @param {String} to    - address of the contract to call.
      * @param {String} data    - data to send with the transaction ( return of txFormat.buildData(...) ).
      * @param {Function} callback    - callback.
      */
    sendRawTransaction(to: any, data: any, confirmationCb: any, continueCb: any, promptCb: any, callback: any): void;
    context(): "memory" | "blockchain";
    getABI(contract: any): any;
    getFallbackInterface(contractABI: any): any;
    getReceiveInterface(contractABI: any): any;
    getInputs(funABI: any): any;
    /**
     * This function send a tx only to javascript VM or testnet, will return an error for the mainnet
     * SHOULD BE TAKEN CAREFULLY!
     *
     * @param {Object} tx    - transaction.
     */
    sendTransaction(tx: any): Promise<unknown>;
    /**
     * This function send a tx without alerting the user (if mainnet or if gas estimation too high).
     * SHOULD BE TAKEN CAREFULLY!
     *
     * @param {Object} tx    - transaction.
     * @param {Function} callback    - callback.
     */
    silentRunTx(tx: any, cb: any): void;
    runTx(args: any, confirmationCb: any, continueCb: any, promptCb: any, cb: any): void;
}
