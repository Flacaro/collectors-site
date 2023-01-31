export abstract class PersistenceService {
    
    abstract save(key: string, value: any): void;

    abstract get(key: string): any;

    abstract remove(key: string): void;

    abstract clear(): void;

}