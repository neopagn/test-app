import {inject, Inject, Injectable, InjectionToken} from '@angular/core';

//I copied this from angular document
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public storage = inject (BROWSER_STORAGE);
  get(key: string) {
    return this.storage.getItem(key);
  }
  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
  remove(key:string){
    this.storage.removeItem(key);
  }
}
