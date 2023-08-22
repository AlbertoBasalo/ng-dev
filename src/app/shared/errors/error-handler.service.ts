import { ErrorHandler, Injectable, inject } from '@angular/core';
import { GlobalStore } from '../state/global.store';
import { HandledError } from './handled-error.class';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  #globalStore = inject(GlobalStore);
  handleError(err: any): void {
    console.log('error', (err as any)['stack']);
    let error = new HandledError(err);
    this.#globalStore.handleError(error);
  }
}
