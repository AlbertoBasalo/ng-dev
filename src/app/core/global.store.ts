import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface UserToken {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
const defaultToken: UserToken = {
  accessToken: '',
  user: {
    id: '',
    name: '',
    email: '',
  },
};

@Injectable({ providedIn: 'root' })
export class GlobalStore {
  #router = inject(Router);
  #userToken = signal<UserToken>(defaultToken);
  // derived states
  readonly isLogged = computed(() => this.#userToken().accessToken !== '');
  readonly apiToken = computed(() => this.#userToken().accessToken);
  readonly user = computed(() => this.#userToken().user);
  readonly userId = computed(() => this.#userToken().user.id);

  constructor() {
    const userToken = localStorage.getItem('user-access-token');
    if (userToken) {
      this.#userToken.set(JSON.parse(userToken));
    }
  }

  // setters
  setUserToken(userToken: UserToken): void {
    this.#userToken.set(userToken);
    localStorage.setItem('user-access-token', JSON.stringify(userToken));
    this.#router.navigate(['/']);
  }
  removeUserToken(): void {
    this.#userToken.set(defaultToken);
    localStorage.removeItem('user-access-token');
    this.#router.navigate(['/auth', 'sign-up']);
  }
}
