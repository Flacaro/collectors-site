import { Injectable, Injector, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collector } from '../models/collector';
import { PersistenceService } from '../services/persistence/persistence-service';

@Injectable({
  providedIn: 'root'
})
export class LoggedCollectorService {

  private currentLoggedCollector$: BehaviorSubject<Collector | null> = new BehaviorSubject<Collector | null>(null);

  constructor(private persistenceService: PersistenceService) {
  }

  getCurrentCollector(): Observable<Collector | null> {
    return this.currentLoggedCollector$.asObservable();
  }

  getCurrentCollectorValue(): Collector | null {
    return this.currentLoggedCollector$.value;
  }

  setCurrentCollector(value: Collector | null) {
    this.currentLoggedCollector$.next(value);
  }

  loadCurrentCollectorIfExists() {
    const loggedCollector = this.persistenceService.get(CONSTANTS.LOGGED_COLLECTOR_KEY);
    if(loggedCollector) {
      this.setCurrentCollector(JSON.parse(loggedCollector));
    }
  }

  //get the collector is owner of collection
  isOwnerOfCollection(collection: any): boolean {
    if (this.currentLoggedCollector$.value !== null) {
      return this.currentLoggedCollector$.value.id === collection.collectorId;
    }
    return false;
  }

}
