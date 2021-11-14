export interface RefreshOptions {
    refreshInterval?: number;
    refreshWhenHidden?: boolean;
    refreshWhenOffline?: boolean;
}
export interface UseFetchOptions extends RefreshOptions {
    fetchOnFocus?: boolean;
    focusDelay?: number;
    fetchOnReconnect?: boolean;
}
export interface Callback {
    (...args: []): any;
}
export declare function useFetch(cb: Callback, options: UseFetchOptions): () => void;
