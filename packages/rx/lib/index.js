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
exports.useFetch = void 0;
const config_1 = require("./config");
const helpers_1 = require("./helpers");
function useRefresh(cb, options) {
    const { refreshInterval, refreshWhenHidden, refreshWhenOffline } = options;
    let tid;
    let outupdated = false;
    const next = () => __awaiter(this, void 0, void 0, function* () {
        const executor = () => __awaiter(this, void 0, void 0, function* () {
            if (outupdated)
                return;
            console.log('isVisible()', (0, helpers_1.isVisible)(), (0, helpers_1.isOnline)());
            if ((refreshWhenHidden || (0, helpers_1.isVisible)()) && (refreshWhenOffline || (0, helpers_1.isOnline)())) {
                yield cb();
                next();
            }
            else {
                next();
            }
        });
        if (refreshInterval && !outupdated) {
            tid = window.setTimeout(() => {
                executor();
            }, refreshInterval);
        }
    });
    next();
    return () => {
        clearTimeout(tid);
        outupdated = true;
    };
}
function useFetch(cb, options) {
    const disposed = [];
    let minFocusActiveTime = 0;
    const handleEvent = (event) => {
        if (event === config_1.EventTypes.focus && options.fetchOnFocus) {
            const now = +new Date();
            if ((0, helpers_1.isActive)() && now > minFocusActiveTime) {
                minFocusActiveTime = now + (options.focusDelay || 1000);
                cb();
            }
        }
        else if (event === config_1.EventTypes.reconnect && options.fetchOnReconnect) {
            if ((0, helpers_1.isActive)()) {
                cb();
            }
        }
    };
    disposed.push((0, config_1.subscribeEvents)(handleEvent));
    if (options.refreshInterval) {
        disposed.push(useRefresh(cb, options));
    }
    const clear = () => {
        disposed.map(d => d());
    };
    // 兼容 vue
    if (options.autoClear && typeof this !== undefined && this._isVue) {
        this.$once('hook:beforeDestroy', clear);
    }
    return clear;
}
exports.useFetch = useFetch;
