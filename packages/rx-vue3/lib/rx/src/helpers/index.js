"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initReconnect = exports.initFocus = exports.isActive = exports.isVisible = exports.isOnline = exports.hasDocument = exports.hasWindow = exports.isFunction = exports.isUndefined = exports.noop = void 0;
exports.noop = () => { };
exports.isUndefined = (v) => v === undefined;
exports.isFunction = (v) => typeof v == 'function';
exports.hasWindow = () => typeof window != undefined;
exports.hasDocument = () => typeof document != undefined;
let online = true;
exports.isOnline = () => online;
const hasWin = exports.hasWindow();
const hasDoc = exports.hasDocument();
const onWindowEvent = hasWin && window.addEventListener
    ? window.addEventListener.bind(window)
    : exports.noop;
const onDocumentEvent = hasDoc ? document.addEventListener.bind(document) : exports.noop;
const offWindowEvent = hasWin && window.removeEventListener
    ? window.removeEventListener.bind(window)
    : exports.noop;
const offDocumentEvent = hasDoc
    ? document.removeEventListener.bind(document)
    : exports.noop;
exports.isVisible = () => {
    const visibilityState = hasDoc && document.visibilityState;
    if (!exports.isUndefined(visibilityState)) {
        return visibilityState !== 'hidden';
    }
    return true;
};
exports.isActive = () => {
    return exports.isVisible() && exports.isOnline();
};
exports.initFocus = (cb) => {
    onDocumentEvent('visibilitychange', cb);
    onWindowEvent('focus', cb);
    return () => {
        offDocumentEvent('visibilitychange', cb);
        offWindowEvent('focus', cb);
    };
};
exports.initReconnect = (cb) => {
    const onOnline = () => {
        console.log('online');
        online = true;
        cb();
    };
    const onOffline = () => {
        console.log('offline');
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return () => {
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
