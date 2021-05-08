"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const express_ws_1 = tslib_1.__importDefault(require("express-ws"));
const provider_1 = require("./provider");
const logs_1 = require("./utils/logs");
const app = express_1.default();
class Server {
    constructor(options) {
        this.provider = new provider_1.Provider(options);
        this.provider.init().then(() => {
            logs_1.log('Provider initiated');
        }).catch((error) => {
            logs_1.log(error);
        });
        this.rpcOnly = options.rpc;
    }
    start(host, port) {
        express_ws_1.default(app);
        app.use(cors_1.default());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.get('/', (req, res) => {
            res.send('Welcome to remix-simulator');
        });
        if (this.rpcOnly) {
            app.use((req, res) => {
                this.provider.sendAsync(req.body, (err, jsonResponse) => {
                    if (err) {
                        return res.send(JSON.stringify({ error: err }));
                    }
                    res.send(jsonResponse);
                });
            });
        }
        else {
            app.ws('/', (ws, req) => {
                ws.on('message', (msg) => {
                    this.provider.sendAsync(JSON.parse(msg), (err, jsonResponse) => {
                        if (err) {
                            return ws.send(JSON.stringify({ error: err }));
                        }
                        ws.send(JSON.stringify(jsonResponse));
                    });
                });
                this.provider.on('data', (result) => {
                    ws.send(JSON.stringify(result));
                });
            });
        }
        app.listen(port, host, () => {
            logs_1.log('Remix Simulator listening on ws://' + host + ':' + port);
            if (!this.rpcOnly) {
                logs_1.log('http json-rpc is deprecated and disabled by default. To enable it use --rpc');
            }
        });
    }
}
module.exports = Server;
//# sourceMappingURL=server.js.map