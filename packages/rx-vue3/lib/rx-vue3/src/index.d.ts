import { UseFetchOptions, Callback } from '../../rx/src/index';
export interface VueUserFetchOptions extends UseFetchOptions {
    autoClear: boolean;
}
export declare function useFetch(cb: Callback, options: VueUserFetchOptions): () => void;
