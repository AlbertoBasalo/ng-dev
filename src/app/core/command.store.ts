import { computed, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export class CommandStore<T> {
  #subscription!: Subscription;
  readonly #isWorking = signal(false);
  readonly #result = signal<T>(this.defaultValue);
  readonly #error = signal<object | null>(null);

  readonly isWorking = this.#isWorking.asReadonly();
  readonly result = this.#result.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly isCompleted = computed(() => !this.#isWorking() && !this.#error());
  readonly errorMessage = computed(() => this.getErrorMessage(this.#error()));
  readonly hasError = computed(() => this.#error() !== null);

  private command$!: Observable<T>;
  constructor(private readonly defaultValue: T, command$?: Observable<T>) {
    if (command$) this.command$ = command$;
  }

  execute(command$?: Observable<T>) {
    const theCommand$ = command$ || this.command$;
    this.onStart();
    this.#subscription = theCommand$.subscribe({
      next: (body) => this.onSucceed(body),
      error: (e) => this.onFail(e),
    });
  }

  protected getErrorMessage(error: object | null): string {
    if (!error) return '';
    if ('message' in error) return error.message as string;
    return JSON.stringify(error);
  }

  private onStart(): void {
    this.#isWorking.set(true);
    this.#result.set(this.defaultValue);
    this.#error.set(null);
  }
  private onFail(error: object): void {
    this.#subscription.unsubscribe();
    this.#isWorking.set(false);
    this.#result.set(this.defaultValue);
    this.#error.set(error);
  }
  private onSucceed(result: T): void {
    this.#subscription.unsubscribe();
    this.#isWorking.set(false);
    this.#result.set(result);
    this.#error.set(null);
  }
}
