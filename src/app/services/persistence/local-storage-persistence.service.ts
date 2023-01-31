import { Injectable } from "@angular/core";
import { PersistenceService } from "./persistence-service";

@Injectable()
export class LocalStoragePersistenceService extends PersistenceService {

  constructor() {
    super();
  }

  save(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
  
}
