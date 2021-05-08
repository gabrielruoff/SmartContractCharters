export declare class Provider {
    options: Record<string, unknown>;
    executionContext: any;
    Accounts: any;
    Transactions: any;
    methods: any;
    host: string;
    connected: boolean;
    constructor(host?: string, options?: Record<string, unknown>);
    init(): Promise<void>;
    sendAsync(payload: any, callback: any): any;
    send(payload: any, callback: any): void;
    isConnected(): boolean;
    disconnect(): boolean;
    supportsSubscriptions(): boolean;
    on(type: any, cb: any): void;
}
