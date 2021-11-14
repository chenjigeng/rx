export const noop = () => { }

export const isUndefined = (v: any): v is undefined => v === undefined
export const isFunction = (v: any): v is Function => typeof v == 'function'

export const hasWindow = () => typeof window != undefined
export const hasDocument = () => typeof document != undefined


let online = true
export const isOnline = () => online

const hasWin = hasWindow()
const hasDoc = hasDocument()

const onWindowEvent =
  hasWin && window.addEventListener
    ? window.addEventListener.bind(window)
    : noop
const onDocumentEvent = hasDoc ? document.addEventListener.bind(document) : noop
const offWindowEvent =
  hasWin && window.removeEventListener
    ? window.removeEventListener.bind(window)
    : noop
const offDocumentEvent = hasDoc
  ? document.removeEventListener.bind(document)
  : noop

export const isVisible = () => {
  const visibilityState = hasDoc && document.visibilityState
  if (!isUndefined(visibilityState)) {
    return visibilityState !== 'hidden'
  }
  return true
}

export const isActive = () => {
  return isVisible() && isOnline();
}

export const initFocus = (cb: () => void) => {
  onDocumentEvent('visibilitychange', cb)
  onWindowEvent('focus', cb)
  return () => {
    offDocumentEvent('visibilitychange', cb)
    offWindowEvent('focus', cb)
  }
}

export const initReconnect = (cb: () => void) => {
  const onOnline = () => {
    online = true
    cb()
  }
  const onOffline = () => {
    online = false
  }
  onWindowEvent('online', onOnline)
  onWindowEvent('offline', onOffline)
  return () => {
    offWindowEvent('online', onOnline)
    offWindowEvent('offline', onOffline)
  }
}
