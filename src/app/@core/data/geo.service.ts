import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GeoService {
  position;

  constructor() {
  }

  get() {
    return this.position;
  }

  set(position) {
    this.position = position;
  }
}
