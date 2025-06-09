export interface StockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    timestamp: Date;
}

export interface UserNotification {
    userId: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
}