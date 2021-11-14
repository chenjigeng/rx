interface TargetCallback {
    (type: EventTypes): void;
}
export declare enum EventTypes {
    reconnect = 0,
    focus = 1
}
export declare const eventBus: {
    subscribeEvents(cb: TargetCallback): () => void;
    unsubscribeEvents(cb: TargetCallback): void;
    broadcase(event: EventTypes): void;
};
export declare const subscribeEvents: (cb: TargetCallback) => () => void;
export {};
