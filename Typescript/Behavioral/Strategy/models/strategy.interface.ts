export interface PaymentResult {
    success: boolean;
    transactionId?: string;
    errorMessage?: string;
    fees: number;
    processingTime: number;
}

export interface PaymentStrategy {
    processPayment(amount: number, currency: string): Promise<PaymentResult>;
    validatePaymentData(): boolean;
    calculateFees(amount: number): number;
    getSupportedCurrencies(): string[];
}

export interface PaymentData {
    amount: number;
    currency: string;
    description?: string;
    metadata?: Record<string, any>;
}