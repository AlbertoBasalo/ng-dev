import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

@Injectable()
export class HomeFacade {
  #http = inject(HttpClient);
  #error = signal<any>(null);
  #api = 'http://localhost:3000/activities';
  hasError = computed(() => !!this.#error());
  errorMessage = computed(() => this.#error()?.message ?? '');
  loading = signal(false);
  activities = signal<object[]>([]);
  showData = computed(() => !this.loading() && !this.#error());
  getActivities(): void {
    this.loading.set(true);
    const publishedUrl = `${this.#api}?state=published`;
    this.#http.get<object[]>(publishedUrl).subscribe({
      next: (body) => {
        this.activities.set(body);
        this.loading.set(false);
      },
      error: (e) => {
        this.#error.set(e);
        this.loading.set(false);
      },
    });
  }
}
