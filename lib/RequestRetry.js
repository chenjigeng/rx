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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.Retry = (retryCount = 3, interval = 0) => (target, name, descriptor) => {
    let count = 1;
    const func = descriptor.value;
    const sleep = (msTime) => new Promise(resolve => setTimeout(resolve, msTime));
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const singleTry = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let result;
                    const params = args.concat([count]);
                    try {
                        result = yield func.call(that, ...params);
                    }
                    catch (err) {
                        console.error(err);
                    }
                    if (!result || result.errCode !== 0) {
                        if (count >= retryCount)
                            return result;
                        count = count + 1;
                        yield sleep(interval);
                        return yield singleTry();
                    }
                    return result;
                });
            };
            return yield singleTry();
        });
    };
    return descriptor;
};
