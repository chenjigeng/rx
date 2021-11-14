"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeEvents = exports.eventBus = exports.EventTypes = void 0;
const helpers_1 = require("./helpers");
const targets = new Set();
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["reconnect"] = 0] = "reconnect";
    EventTypes[EventTypes["focus"] = 1] = "focus";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
exports.eventBus = {
    subscribeEvents(cb) {
        targets.add(cb);
        return () => exports.eventBus.unsubscribeEvents(cb);
    },
    unsubscribeEvents(cb) {
        targets.delete(cb);
    },
    broadcase(event) {
        targets.forEach(targrt => targrt(event));
    }
};
helpers_1.initFocus(() => {
    exports.eventBus.broadcase(EventTypes.focus);
});
helpers_1.initReconnect(() => {
    exports.eventBus.broadcase(EventTypes.reconnect);
});
exports.subscribeEvents = exports.eventBus.subscribeEvents;
