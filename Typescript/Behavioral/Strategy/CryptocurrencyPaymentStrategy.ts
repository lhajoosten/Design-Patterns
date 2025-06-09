import { PaymentResult, PaymentStrategy } from "./models/strategy.interface";

/**
 * CryptocurrencyPaymentStrategy implements the PaymentStrategy interface for processing cryptocurrency payments.
 * It includes methods for validating payment data, calculating fees, and processing the payment.
 */
export class CryptocurrencyPaymentStrategy implements PaymentStrategy {
    constructor(
        private walletAddress: string,
        private privateKey: string,
        private cryptocurrency: string
    ) { }

    async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        const startTime = Date.now();

        await new Promise(resolve => setTimeout(resolve, 2000)); // Longer processing time

        if (!this.validatePaymentData()) {
            return {
                success: false,
                errorMessage: 'Invalid cryptocurrency wallet details',
                fees: 0,
                processingTime: Date.now() - startTime
            };
        }

        // Crypto has higher volatility, lower success rate
        const success = Math.random() > 0.15; // 85% success rate
        const fees = this.calculateFees(amount);

        return {
            success,
            transactionId: success ? `CRYPTO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : undefined,
            errorMessage: success ? undefined : 'Blockchain transaction failed',
            fees,
            processingTime: Date.now() - startTime
        };
    }

    validatePaymentData(): boolean {
        return this.walletAddress.length >= 26 &&
            this.privateKey.length >= 51 &&
            ['BTC', 'ETH', 'LTC', 'ADA'].includes(this.cryptocurrency.toUpperCase());
    }

    calculateFees(amount: number): number {
        // Network fees vary by cryptocurrency
        const networkFees = {
            'BTC': 0.0005 * amount,
            'ETH': 0.002 * amount,
            'LTC': 0.0001 * amount,
            'ADA': 0.00001 * amount
        };
        return networkFees[this.cryptocurrency.toUpperCase() as keyof typeof networkFees] || 0.001 * amount;
    }

    getSupportedCurrencies(): string[] {
        return ['BTC', 'ETH', 'LTC', 'ADA'];
    }
}
