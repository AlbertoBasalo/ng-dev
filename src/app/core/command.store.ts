import { computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Exception } from './error.interceptor';

export class CommandStore<T> {
  readonly #isWorking = signal(false);
  readonly #result = signal<T>(this.defaultValue);
  readonly #error = signal<Exception | null>(null);

  readonly isWorking = this.#isWorking.asReadonly();
  readonly result = this.#result.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly isCompleted = computed(() => !this.#isWorking() && !this.#error());
  readonly errorMessage = computed(() => this.#error()?.message ?? '');
  readonly hasError = computed(() => this.#error() !== null);

  constructor(private readonly defaultValue: T) {}

  execute(command$: Observable<T>) {
    this.onStart();
    command$.subscribe({
      next: (body) => this.onSucceed(body),
      error: (e) => this.onFail(e),
    });
  }

  private onStart(): void {
    this.#isWorking.set(true);
    this.#result.set(this.defaultValue);
    this.#error.set(null);
  }
  private onFail(error: object): void {
    this.#isWorking.set(false);
    this.#result.set(this.defaultValue);
    if (error instanceof Exception) {
      this.#error.set(error);
    } else {
      this.#error.set(
        new Exception(0, this.getErrorMessage(error), 'Application Error', '🤷‍♀️')
      );
    }
  }
  private onSucceed(result: T): void {
    this.#isWorking.set(false);
    this.#result.set(result);
    this.#error.set(null);
  }
  private getErrorMessage(error: object | null): string {
    if (error === null) return '';
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }
}
