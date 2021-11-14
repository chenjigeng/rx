"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const RequestLock_1 = require("./RequestLock");
const RequestRetry_1 = require("./RequestRetry");
__export(require("axios"));
exports.RequestLock = RequestLock_1.Lock;
exports.RequestRetry = RequestRetry_1.Retry;
const request = (config) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config.method)
        config.method = "POST";
    const data = config.data || config.params || {};
    if (config.method.toLocaleLowerCase() === "get") {
        config.params = data;
    }
    else {
        config.data = data;
    }
    const response = yield axios_1.default.request(config);
    return response.data;
});
exports.default = request;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.get = (url, data, config = {}) => __awaiter(void 0, void 0, void 0, function* () {
    config.method = "GET";
    config.url = url;
    config.data = data;
    return yield request(config);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.post = (url, data, config = {}) => __awaiter(void 0, void 0, void 0, function* () {
    config.method = "POST";
    config.url = url;
    config.data = data;
    return yield request(config);
});
