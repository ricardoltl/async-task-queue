type Listener = (message: string) => void;

class NotificationSystem {
  private listeners: Listener[] = [];

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  public notify(message: string) {
    this.listeners.forEach((listener) => listener(message));
  }
}

export const notificationSystem = new NotificationSystem();
