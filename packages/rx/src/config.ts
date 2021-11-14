import { initFocus, initReconnect } from "./helpers";

interface TargetCallback {
  (type: EventTypes): void;
}

const targets = new Set<TargetCallback>()

export enum EventTypes {
  reconnect = 0,
  focus = 1
}

export const eventBus = {
  subscribeEvents(cb: TargetCallback) {
    targets.add(cb);
    return () => eventBus.unsubscribeEvents(cb);
  },
  unsubscribeEvents(cb: TargetCallback) {
    targets.delete(cb);
  },
  broadcase(event: EventTypes) {
    targets.forEach(targrt => targrt(event));
  }
}

initFocus(() => {
  eventBus.broadcase(EventTypes.focus);
})

initReconnect(() => {
  eventBus.broadcase(EventTypes.reconnect);
})

export const subscribeEvents = eventBus.subscribeEvents;