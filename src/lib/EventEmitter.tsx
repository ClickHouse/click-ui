export interface Listener<T> {
  (event: T): void;
}

export interface Disposable {
  dispose: () => void;
}

/** passes through events as they happen. You will not get events from before you start listening */
export class EventEmitter<T> {
  private listeners: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  }

  off = (listener: Listener<T>) => {
    const callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) {
      this.listeners.splice(callbackIndex, 1);
    }
  }

  emit = (event: T) => {
    /** Update any general listeners */
    this.listeners.forEach((listener: Listener<T>) => listener(event));
  }
}
