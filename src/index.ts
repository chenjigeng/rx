import { initFocus, initReconnect, isActive, isOnline, isVisible } from "./helpers";

// 轮询
interface RefreshOptions {
  refreshInterval?: number;
  refreshWhenHidden?: boolean;
  refreshWhenOffline?: boolean;
}

interface UseFetchOptions extends RefreshOptions {
  fetchOnFocus?: boolean;
  focusDelay?: number;
  fetchOnReconnect?: boolean;
}

interface Callback {
  (...args: []): any
}

function useFocus(cb: Callback, focusDelay: number) {
  let minFocusActiveTime = 0;

  return initFocus(() => {
    const now = +new Date();
    if (isActive() && now > minFocusActiveTime) {
      minFocusActiveTime = now + focusDelay;
      cb();
    }
  })
}

function useReConnect(cb: Callback) {
  return initReconnect(() => {
    if (isActive()) {
      cb();
    }
  })
}

function useRefresh(cb: Callback, options: RefreshOptions) {
  const { refreshInterval, refreshWhenHidden, refreshWhenOffline } = options;
  let tid: number;
  let outupdated = false;

  const executor = async () => {
    if (outupdated) return;
    if ((refreshWhenHidden || isVisible()) && (refreshWhenOffline || isOnline())) {
      await cb();
      next();
    } else {
      next();
    }
  }

  const next = async () => {
    if (refreshInterval && !outupdated) {
      tid = setTimeout(() => {
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
  let disposed: Array<() => void> = [];
  if (options.fetchOnFocus) {
    disposed.push(useFocus(cb, options.focusDelay || 1000));
  }

  if (options.fetchOnReconnect) {
    disposed.push(useReConnect(cb));
  }

  if (options.refreshInterval) {
    disposed.push(useRefresh(cb, options));
  }

  return () => {
    disposed.map(d => d())
  }
}
