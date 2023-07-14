import { computed, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// To do: rename to something like "APICommandState" or "SignalState"

export class CommandState<T> {
  #subscription!: Subscription;
  readonly #isWorking = signal(false);
  readonly #result = signal<T>(this.defaultValue);
  readonly #error = signal<object | null>(null);

  readonly isWorking = this.#isWorking.asReadonly();
  readonly result = this.#result.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly isCompleted = computed(() => this.result() !== this.defaultValue);
  readonly hasError = computed(() => this.#error() !== null);
  readonly errorMessage = computed(() => this.getErrorMessage(this.#error()));

  constructor(private readonly defaultValue: T) {}

  execute(command$: Observable<T>) {
    this.onStart();
    this.#subscription = command$.subscribe({
      next: (body) => this.onSucceed(body),
      error: (e) => this.onFail(e),
    });
  }

  setStarted(): void {
    this.#isWorking.set(true);
    this.#result.set(this.defaultValue);
    this.#error.set(null);
  }

  setSucceed(result: T): void {
    this.#isWorking.set(false);
    this.#result.set(result);
    this.#error.set(null);
  }

  setFailed(error: object): void {
    this.#isWorking.set(false);
    this.#result.set(this.defaultValue);
    this.#error.set(error);
  }

  protected getErrorMessage(error: object | null): string {
    if (!error) return '';
    if ('message' in error) return error.message as string;
    return JSON.stringify(error);
  }

  private onStart(): void {
    this.setStarted();
  }
  private onSucceed(result: T): void {
    this.#subscription.unsubscribe();
    this.setSucceed(result);
  }

  private onFail(error: object): void {
    this.#subscription.unsubscribe();
    this.setFailed(error);
  }
}
