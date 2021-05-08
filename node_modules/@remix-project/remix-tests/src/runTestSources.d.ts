import { SrcIfc, Options, CompilerConfiguration } from './types';
/**
 * @dev Run tests from source of a test contract file (used for IDE)
 * @param contractSources Sources of contract
 * @param compilerConfig current compiler configuration
 * @param testCallback Test callback
 * @param resultCallback Result Callback
 * @param finalCallback Final Callback
 * @param importFileCb Import file callback
 * @param opts Options
 */
export declare function runTestSources(contractSources: SrcIfc, compilerConfig: CompilerConfiguration, testCallback: any, resultCallback: any, finalCallback: any, importFileCb: any, opts: Options): Promise<void>;
