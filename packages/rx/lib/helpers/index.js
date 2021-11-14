"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initReconnect = exports.initFocus = exports.isActive = exports.isVisible = exports.isOnline = exports.hasDocument = exports.hasWindow = exports.isFunction = exports.isUndefined = exports.noop = void 0;
const noop = () => { };
exports.noop = noop;
const isUndefined = (v) => v === undefined;
exports.isUndefined = isUndefined;
const isFunction = (v) => typeof v == 'function';
exports.isFunction = isFunction;
const hasWindow = () => typeof window != undefined;
exports.hasWindow = hasWindow;
const hasDocument = () => typeof document != undefined;
exports.hasDocument = hasDocument;
let online = true;
const isOnline = () => online;
exports.isOnline = isOnline;
const hasWin = (0, exports.hasWindow)();
const hasDoc = (0, exports.hasDocument)();
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
const isVisible = () => {
    const visibilityState = hasDoc && document.visibilityState;
    if (!(0, exports.isUndefined)(visibilityState)) {
        return visibilityState !== 'hidden';
    }
    return true;
};
exports.isVisible = isVisible;
const isActive = () => {
    return (0, exports.isVisible)() && (0, exports.isOnline)();
};
exports.isActive = isActive;
const initFocus = (cb) => {
    onDocumentEvent('visibilitychange', cb);
    onWindowEvent('focus', cb);
    return () => {
        offDocumentEvent('visibilitychange', cb);
        offWindowEvent('focus', cb);
    };
};
exports.initFocus = initFocus;
const initReconnect = (cb) => {
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
exports.initReconnect = initReconnect;
