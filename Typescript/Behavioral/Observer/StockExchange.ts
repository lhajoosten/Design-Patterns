import { Observer, Subject } from "./Models/observer.model";
import { StockData } from "./models/stockdata.model";

/**
 * StockExchange class implements the Subject interface to manage stock data and notify observers.
 * It allows observers to subscribe for updates on stock changes and notifies them when significant changes occur.
 */
export class StockExchange implements Subject<StockData> {
    private observers: Map<string, Observer<StockData>> = new Map();
    private stocks: Map<string, StockData> = new Map();

    subscribe(observer: Observer<StockData>): void {
        this.observers.set(observer.getId(), observer);
        console.log(`Observer ${observer.getId()} subscribed to stock updates`);
    }

    unsubscribe(observerId: string): void {
        if (this.observers.delete(observerId)) {
            console.log(`Observer ${observerId} unsubscribed from stock updates`);
        }
    }

    notify(data: StockData): void {
        this.observers.forEach(observer => {
            try {
                observer.update(data);
            } catch (error) {
                console.error(`Error notifying observer ${observer.getId()}:`, error);
            }
        });
    }

    updateStock(stockData: StockData): void {
        const previousData = this.stocks.get(stockData.symbol);
        this.stocks.set(stockData.symbol, stockData);

        // Only notify if there's a significant change
        if (!previousData || Math.abs(stockData.change) > 0.01) {
            this.notify(stockData);
        }
    }

    getStock(symbol: string): StockData | undefined {
        return this.stocks.get(symbol);
    }

    getAllStocks(): StockData[] {
        return Array.from(this.stocks.values());
    }
}