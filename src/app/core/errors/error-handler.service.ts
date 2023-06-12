import { ErrorHandler, Injectable, inject } from '@angular/core';
import { GlobalStore } from '../global.store';
import { getHandledError } from './handled-error.class';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  #globalStore = inject(GlobalStore);
  handleError(err: any): void {
    console.log('error', (err as any)['stack']);
    let error = getHandledError(err);
    this.#globalStore.handleError(error);
  }
}
