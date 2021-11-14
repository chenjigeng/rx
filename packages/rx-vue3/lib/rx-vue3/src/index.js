"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
const index_1 = require("../../rx/src/index");
const vue_1 = require("vue");
function useFetch(cb, options) {
    const release = index_1.useFetch(cb, options);
    if (options.autoClear) {
        vue_1.onUnmounted(release);
    }
    return release;
}
exports.useFetch = useFetch;
