import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

@Injectable()
export class HomeFacade {
  #api = 'http://localhost:3000/activities';
  #http = inject(HttpClient);
  getActivitiesState = new CommandState<object[]>();
  getActivities(): void {
    this.getActivitiesState.start();
    const publishedUrl = `${this.#api}?state=published`;
    this.#http.get<object[]>(publishedUrl).subscribe({
      next: (body) => this.getActivitiesState.succeed(body),
      error: (e) => this.getActivitiesState.fail(e),
    });
  }
}

export class CommandState<T> {
  readonly isWorking = signal(false);
  readonly error = signal<object | null>(null);
  readonly result = signal<T | T[] | null>(null);
  readonly hasError = computed(() => !!this.error());
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
  start(): void {
    this.isWorking.set(true);
    this.error.set(null);
    this.result.set(null);
  }
  fail(e: object): void {
    this.isWorking.set(false);
    this.error.set(e);
  }
  succeed(result: T | T[]): void {
    this.isWorking.set(false);
    this.result.set(result);
  }
}
