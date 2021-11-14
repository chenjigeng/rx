import { AxiosRequestConfig } from "axios";
export * from "axios";
export declare const RequestLock: (target: any, name: string, descriptor: any) => any;
export declare const RequestRetry: (retryCount?: number, interval?: number) => (target: any, name: string, descriptor: any) => any;
declare const request: <T>(config: AxiosRequestConfig) => Promise<T>;
export default request;
export declare const get: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
export declare const post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
