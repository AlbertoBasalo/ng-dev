import { ErrorHandler, Injectable, inject } from '@angular/core';
import { GlobalState } from '../global.state';
import { HandledError } from './handled-error.class';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  #globalStore = inject(GlobalState);
  handleError(err: any): void {
    console.log('error', (err as any)['stack']);
    let error = new HandledError(err);
    this.#globalStore.handleError(error);
  }
}
