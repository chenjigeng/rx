import { EventTypes, subscribeEvents } from "./config";
import { isActive, isOnline, isVisible } from "./helpers";

// 轮询参数
export interface RefreshOptions {
  refreshInterval?: number;
  refreshWhenHidden?: boolean;
  refreshWhenOffline?: boolean;
}

export interface UseFetchOptions extends RefreshOptions {
  fetchOnFocus?: boolean;
  focusDelay?: number;
  fetchOnReconnect?: boolean;
  autoClear?: boolean;
}

export interface Callback {
  (...args: []): any;
}

function useRefresh(cb: Callback, options: RefreshOptions) {
  const { refreshInterval, refreshWhenHidden, refreshWhenOffline } = options;
  let tid: number;
  let outupdated = false;

  const next = async () => {
    const executor = async () => {
      if (outupdated) return;
      console.log('isVisible()', isVisible(), isOnline());
      if ((refreshWhenHidden || isVisible()) && (refreshWhenOffline || isOnline())) {
        await cb();
        next();
      } else {
        next();
      }
    }


    if (refreshInterval && !outupdated) {
      tid = window.setTimeout(() => {
        executor();
      }, refreshInterval)
    }
  }

  next();

  return () => {
    clearTimeout(tid);
    outupdated = true;
  }
}

export function useFetch(cb: Callback, options: UseFetchOptions) {
  const disposed: Array<() => void> = [];
  let minFocusActiveTime = 0;

  const handleEvent = (event: EventTypes) => {
    if (event === EventTypes.focus && options.fetchOnFocus) {
      const now = +new Date();
      if (isActive() && now > minFocusActiveTime) {
        minFocusActiveTime = now + (options.focusDelay || 1000);
        cb();
      }
    } else if (event === EventTypes.reconnect && options.fetchOnReconnect) {
      if (isActive()) {
        cb();
      }
    }
  }

  disposed.push(subscribeEvents(handleEvent));

  if (options.refreshInterval) {
    disposed.push(useRefresh(cb, options));
  }

  const clear = () => {
    disposed.map(d => d())
  }

  // 兼容 vue
  if (options.autoClear && typeof this !== undefined && this._isVue) {
    this.$once('hook:beforeDestroy', clear)
  }


  return clear;
}
