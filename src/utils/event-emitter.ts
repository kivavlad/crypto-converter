type EventHandler<T = void> = (data: T) => void;
type EventHandlersMap<T = void> = Map<EventHandler<T>, EventHandler<T>>;
type EventsMap = Map<string, EventHandlersMap<unknown>>;

export class EventEmitter {
  private events: EventsMap;

  constructor() {
    this.events = new Map();
  }

  /**
   * Подписка на событие
   * @param event - Название события
   * @param handler - Обработчик события
   */
  on<T = void>(event: string, handler: EventHandler<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Map());
    }

    const handlers = this.events.get(event) as EventHandlersMap<T>;
    handlers.set(handler, handler);
  }

  /**
   * Отписка от события
   * @param event - Название события
   * @param handler - Обработчик события для удаления
   */
  off<T = void>(event: string, handler: EventHandler<T>): void {
    const handlers = this.events.get(event) as EventHandlersMap<T> | undefined;
    if (handlers) {
      handlers.delete(handler);
    }
  }

  /**
   * Вызвать событие с данными
   * @param event - Название события
   * @param data - Данные для передачи обработчикам
   */
  emit<T = void>(event: string, data?: T): void {
    const handlers = this.events.get(event) as EventHandlersMap<T> | undefined;
    if (handlers) {
      handlers.forEach((handler) => handler(data as T));
    }
  }

  /**
   * Подписаться на событие один раз
   * @param event - Название события
   * @param handler - Обработчик события
   */
  once<T = void>(event: string, handler: EventHandler<T>): void {
    const onceHandler: EventHandler<T> = (data: T) => {
      handler(data);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }

  /**
   * Получить количество обработчиков для события
   * @param eventName - Название события
   * @returns Количество обработчиков
   */
  listenerCount(eventName: string): number {
    const handlers = this.events.get(eventName);
    return handlers ? handlers.size : 0;
  }

  /**
   * Удалить все обработчики для события
   * @param eventName - Название события
   */
  removeAllListeners(eventName?: string): void {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }

  /**
   * Получить список всех зарегистрированных событий
   * @returns Массив названий событий
   */
  eventNames(): string[] {
    return Array.from(this.events.keys());
  }
}
