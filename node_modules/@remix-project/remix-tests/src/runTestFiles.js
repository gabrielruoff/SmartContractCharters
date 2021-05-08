"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const async_1 = tslib_1.__importDefault(require("async"));
const fileSystem_1 = tslib_1.__importDefault(require("./fileSystem"));
const testRunner_1 = require("./testRunner");
const colors_1 = tslib_1.__importDefault(require("colors"));
const compiler_1 = require("./compiler");
const deployer_1 = require("./deployer");
/**
 * @dev run test contract files (used for CLI)
 * @param filepath Path of file
 * @param isDirectory True, if path is a directory
 * @param web3 Web3
 * @param finalCallback optional callback to run finally
 * @param opts Options
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
function runTestFiles(filepath, isDirectory, web3, compilerConfig, finalCallback = () => { }, opts) {
    opts = opts || {};
    compilerConfig = compilerConfig || {};
    const sourceASTs = {};
    const { Signale } = require('signale');
    // signale configuration
    const options = {
        types: {
            result: {
                badge: '\t✓',
                label: '',
                color: 'greenBright'
            },
            name: {
                badge: '\n\t◼',
                label: '',
                color: 'white'
            },
            error: {
                badge: '\t✘',
                label: '',
                color: 'redBright'
            }
        }
    };
    const signale = new Signale(options);
    let accounts = opts['accounts'] || null;
    async_1.default.waterfall([
        function getAccountList(next) {
            if (accounts)
                return next(null);
            web3.eth.getAccounts((_err, _accounts) => {
                accounts = _accounts;
                next(null);
            });
        },
        function compile(next) {
            compiler_1.compileFileOrFiles(filepath, isDirectory, { accounts }, compilerConfig, next);
        },
        function deployAllContracts(compilationResult, asts, next) {
            // Extract AST of test contract file source
            for (const filename in asts) {
                if (filename.endsWith('_test.sol')) {
                    sourceASTs[filename] = asts[filename].ast;
                }
            }
            deployer_1.deployAll(compilationResult, web3, false, (err, contracts) => {
                if (err) {
                    next(err);
                }
                next(null, compilationResult, contracts);
            });
        },
        function determineTestContractsToRun(compilationResult, contracts, next) {
            const contractsToTest = [];
            const contractsToTestDetails = [];
            const gatherContractsFrom = function (filename) {
                if (!filename.endsWith('_test.sol')) {
                    return;
                }
                try {
                    Object.keys(compilationResult[filename]).forEach(contractName => {
                        contractsToTest.push(contractName);
                        contractsToTestDetails.push(compilationResult[filename][contractName]);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            };
            if (isDirectory) {
                fileSystem_1.default.walkSync(filepath, (foundpath) => {
                    gatherContractsFrom(foundpath);
                });
            }
            else {
                gatherContractsFrom(filepath);
            }
            next(null, contractsToTest, contractsToTestDetails, contracts);
        },
        function runTests(contractsToTest, contractsToTestDetails, contracts, next) {
            let totalPassing = 0;
            let totalFailing = 0;
            let totalTime = 0;
            const errors = [];
            const _testCallback = function (err, result) {
                if (err)
                    throw err;
                if (result.type === 'contract') {
                    signale.name(result.value.white);
                }
                else if (result.type === 'testPass') {
                    signale.result(result.value);
                }
                else if (result.type === 'testFailure') {
                    signale.error(result.value.red);
                    errors.push(result);
                }
            };
            const _resultsCallback = (_err, result, cb) => {
                totalPassing += result.passingNum;
                totalFailing += result.failureNum;
                totalTime += result.timePassed;
                cb();
            };
            async_1.default.eachOfLimit(contractsToTest, 1, (contractName, index, cb) => {
                try {
                    const fileAST = sourceASTs[contracts[contractName]['filename']];
                    testRunner_1.runTest(contractName, contracts[contractName], contractsToTestDetails[index], fileAST, { accounts }, _testCallback, (err, result) => {
                        if (err) {
                            console.log(err);
                            return cb(err);
                        }
                        _resultsCallback(null, result, cb);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }, function (err) {
                if (err) {
                    return next(err);
                }
                console.log('\n');
                if (totalPassing > 0) {
                    console.log(colors_1.default.green(totalPassing + ' passing ') + colors_1.default.grey('(' + totalTime + 's)'));
                }
                if (totalFailing > 0) {
                    console.log(colors_1.default.red(totalFailing + ' failing'));
                }
                console.log('');
                errors.forEach((error, index) => {
                    console.log('  ' + (index + 1) + ') ' + colors_1.default.bold(error.context + ': ') + error.value);
                    console.log('');
                    console.log(colors_1.default.red('\t error: ' + error.errMsg));
                    console.log(colors_1.default.green('\t expected value to be ' + error.assertMethod + ' to: ' + error.expected));
                    console.log(colors_1.default.red('\t returned: ' + error.returned));
                });
                console.log('');
                next();
            });
        }
    ], finalCallback);
}
exports.runTestFiles = runTestFiles;
//# sourceMappingURL=runTestFiles.js.map