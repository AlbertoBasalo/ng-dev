import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  DEFAULT_USER_TOKEN,
  UserToken,
} from '../domain/models/user-token.interface';
import { HandledError } from '../errors/handled-error.class';

@Injectable({ providedIn: 'root' })
export class GlobalStore {
  readonly #router = inject(Router);
  readonly #localStorage = new LocalStorage('user-access-token');
  readonly #userToken = signal<UserToken>(DEFAULT_USER_TOKEN);
  readonly #handledError = signal<HandledError | null>(null);

  readonly isLogged = computed(() => this.#userToken().accessToken !== '');
  readonly apiToken = computed(() => this.#userToken().accessToken);
  readonly user = computed(() => this.#userToken().user);
  readonly userId = computed(() => this.#userToken().user.id);
  readonly handledError = this.#handledError.asReadonly();

  constructor() {
    const userToken = this.#localStorage.get(DEFAULT_USER_TOKEN);
    this.#userToken.set(userToken);
  }

  setUserToken(userToken: UserToken): void {
    this.#userToken.set(userToken);
    this.#localStorage.set(userToken);
    this.#router.navigate(['/']);
  }
  removeUserToken(): void {
    this.#userToken.set(DEFAULT_USER_TOKEN);
    this.#localStorage.remove();
    this.#router.navigate(['/auth', 'sign-up']);
  }
  handleError(error: HandledError): void {
    this.#handledError.set(error);
    // To do : move to an instrumentation subscriber
    console.warn(`${error.icon} ${error.name}: ${error.message}`);
    if (error.stack) console.log(error.stack);
  }
}

export class LocalStorage {
  constructor(private readonly key: string) {}

  get<T>(defaultValue: T): T {
    const value = localStorage.getItem(this.key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  }
  set<T>(value: T): void {
    const json = JSON.stringify(value);
    localStorage.setItem(this.key, json);
  }
  remove(): void {
    localStorage.removeItem(this.key);
  }
}
