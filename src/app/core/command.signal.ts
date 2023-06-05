import { computed, signal } from '@angular/core';
import { Observable } from 'rxjs';

export class CommandSignal<T> {
  readonly isWorking = signal(false);
  readonly result = signal<T | T[] | null>(null);
  readonly error = signal<object | null>(null);
  // derived states
  readonly hasError = computed(() => this.error() !== null);
  readonly isCompleted = computed(() => {
    if (this.isWorking()) return false;
    if (this.error()) return false;
    return true;
  });
  readonly hasContent = computed(() => {
    const result = this.result();
    if (!result) return false;
    if (Array.isArray(result)) return result.length > 0;
    return true;
  });
  readonly errorMessage = computed(() => {
    const e = this.error();
    if (!e) return '';
    return e instanceof Error ? e.message : JSON.stringify(e);
  });

  execute(command$: Observable<T | T[]>) {
    this.start();
    command$.subscribe({
      next: (body) => this.succeed(body),
      error: (e) => this.fail(e),
    });
  }

  private start(): void {
    this.isWorking.set(true);
    this.result.set(null);
    this.error.set(null);
  }
  private fail(error: object): void {
    this.isWorking.set(false);
    this.result.set(null);
    this.error.set(error);
  }
  private succeed(result: T | T[]): void {
    this.isWorking.set(false);
    this.result.set(result);
    this.error.set(null);
  }
}
