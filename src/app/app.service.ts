import { Injectable } from '@angular/core';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InteralStateType = { };

  constructor() {

  }

}
