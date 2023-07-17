"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCorrelationId = exports.getLogger = void 0;
var pino_1 = __importDefault(require("pino"));
var X_CORRELATION_ID = "x-correlation-id";
var logger;
var getLogger = function () {
    var deploymentEnv = process.env.DEPLOYMENT_ENV;
    if (!logger) {
        logger = (0, pino_1.default)({
            level: deploymentEnv === "local" ? "debug" : "info",
        });
    }
    return logger;
};
exports.getLogger = getLogger;
var generateCorrelationId = function () {
    return crypto.randomUUID();
};
exports.generateCorrelationId = generateCorrelationId;
var http_1 = require("http");
var next_1 = __importDefault(require("next"));
var path = __importStar(require("path"));
var url_1 = require("url");
// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on("SIGTERM", function () { return process.exit(0); });
    process.on("SIGINT", function () { return process.exit(0); });
}
// Next.js server options:
// - The environment variable is set by `@nx/next:server` when running the dev server.
// - The fallback `__dirname` is for production builds.
var dir = process.env.NX_NEXT_DIR || path.join(__dirname);
var dev = process.env.NODE_ENV === "development";
// HTTP Server options:
var hostname = "0.0.0.0";
var port = 3000;
var keepAliveTimeout = parseInt((_a = process.env.KEEP_ALIVE_TIMEOUT) !== null && _a !== void 0 ? _a : "", 10);
var requestLogger = (0, exports.getLogger)();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var nextApp, handle, server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextApp = (0, next_1.default)({ dev: dev, dir: dir, hostname: hostname, port: port });
                    handle = nextApp.getRequestHandler();
                    return [4 /*yield*/, nextApp.prepare()];
                case 1:
                    _a.sent();
                    server = (0, http_1.createServer)(function (req, res) {
                        var _a;
                        req.headers[X_CORRELATION_ID] = crypto.randomUUID();
                        requestLogger.info({
                            url: req.url,
                            method: req.method,
                            correlationId: req.headers[X_CORRELATION_ID],
                            msg: "inbound request",
                        });
                        var parsedUrl = (0, url_1.parse)((_a = req.url) !== null && _a !== void 0 ? _a : "", true);
                        handle(req, res, parsedUrl);
                    });
                    if (!Number.isNaN(keepAliveTimeout) &&
                        Number.isFinite(keepAliveTimeout) &&
                        keepAliveTimeout >= 0) {
                        console.log("setting keepAliveTimeout", {
                            keepAliveTimeout: "".concat(keepAliveTimeout, "ms"),
                        });
                        server.keepAliveTimeout = keepAliveTimeout;
                    }
                    server.listen(port, hostname);
                    requestLogger.info({
                        msg: "next server ready",
                        url: "http://".concat(hostname, ":").concat(port),
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error(err);
    process.exit(1);
});
