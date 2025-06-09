import { Observer } from "./Models/observer.model";
import { StockData } from "./models/stockdata.model";

/**
 * PortfolioTracker class implements the Observer interface to track stock holdings and notify users of significant changes.
 * It allows users to add holdings, receive updates on stock price changes, and calculate portfolio value.
 */
export class PortfolioTracker implements Observer<StockData> {
    private portfolio: Map<string, { shares: number; avgPrice: number }> = new Map();
    private id: string;
    private name: string = "Portfolio Tracker";

    constructor(private userId: string, private alertThreshold: number = 5) {
        this.id = `portfolio-${userId}`;
    }

    getName(): string {
        return this.name;
    }

    getId(): string {
        return this.id;
    }

    addHolding(symbol: string, shares: number, avgPrice: number): void {
        this.portfolio.set(symbol, { shares, avgPrice });
    }

    update(stockData: StockData): void {
        const holding = this.portfolio.get(stockData.symbol);
        if (!holding) return;

        const currentValue = holding.shares * stockData.price;
        const originalValue = holding.shares * holding.avgPrice;
        const changePercent = ((currentValue - originalValue) / originalValue) * 100;

        console.log(`📊 Portfolio Update for ${this.userId}:`);
        console.log(`  ${stockData.symbol}: ${holding.shares} shares`);
        console.log(`  Current Value: $${currentValue.toFixed(2)}`);
        console.log(`  P&L: ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`);

        // Alert on significant changes
        if (Math.abs(changePercent) >= this.alertThreshold) {
            console.log(`🚨 ALERT: ${stockData.symbol} has ${changePercent > 0 ? 'gained' : 'lost'} ${Math.abs(changePercent).toFixed(2)}%`);
        }
    }

    getPortfolioValue(currentPrices: Map<string, number>): number {
        let totalValue = 0;
        this.portfolio.forEach((holding, symbol) => {
            const currentPrice = currentPrices.get(symbol) || holding.avgPrice;
            totalValue += holding.shares * currentPrice;
        });
        return totalValue;
    }
}