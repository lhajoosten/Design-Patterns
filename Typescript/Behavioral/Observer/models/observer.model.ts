export interface Observer<T = any> {
    update(data: any): void;
    getId(): string;
    getName(): string;
}

export interface Subject<T = any> {
    subscribe(observer: Observer<T>): void;
    unsubscribe(observerId: string): void;
    notify(data: T): void;
}