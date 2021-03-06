"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
const vue_1 = require("vue");
const rx_1 = require("rx");
function useFetch(cb, options) {
    const { autoClear } = options;
    if (options.autoClear) {
        delete options.autoClear;
    }
    const release = (0, rx_1.useFetch)(cb, options);
    if (autoClear) {
        (0, vue_1.onUnmounted)(() => {
            release();
        });
    }
    return release;
}
exports.useFetch = useFetch;
