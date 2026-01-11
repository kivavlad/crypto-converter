import { EventEmitter } from "../utils/event-emitter";

enum ErrorEvents {
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden'
};

const errorEmmiter = new EventEmitter();

export const emitError = (event: keyof typeof ErrorEvents) => {
  errorEmmiter.emit(event);
}

export const onError = (
  event: keyof typeof ErrorEvents,
  callback: () => void
) => {
  errorEmmiter.on(event, callback);
  return () => errorEmmiter.off(event, callback);
};
