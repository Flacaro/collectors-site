import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collector } from '../models/collector';

@Injectable({
  providedIn: 'root'
})
export class LoggedCollectorService {

  private currentLoggedCollector$: BehaviorSubject<Collector | null> = new BehaviorSubject<Collector | null>(null);

  constructor() { }

  getCurrentCollector(): Observable<Collector | null> {
    return this.currentLoggedCollector$.asObservable();
  }

  getCurrentCollectorValue(): Collector | null {
    return this.currentLoggedCollector$.value;
  }

  setCurrentCollector(value: Collector | null) {
    this.currentLoggedCollector$.next(value);
  }
}
