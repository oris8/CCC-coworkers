export default class InterceptorManager<T> {
  public handlers: {
    fulfilled?: ((value: T) => T | Promise<T>) | null | undefined;
    rejected?: ((error: any) => any) | null | undefined;
    synchronous: boolean;
    runWhen: ((config: any) => boolean) | null;
  }[] = [];

  use(
    fulfilled?: ((value: T) => T | Promise<T>) | null | undefined,
    rejected?: ((error: any) => any) | null | undefined,
    options?: { synchronous?: boolean; runWhen?: (config: any) => boolean }
  ) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options?.synchronous ?? false,
      runWhen: options?.runWhen ?? null,
    });
    return this.handlers.length - 1;
  }

  forEach(callback: (handler: any) => void) {
    this.handlers.forEach(callback);
  }
}
