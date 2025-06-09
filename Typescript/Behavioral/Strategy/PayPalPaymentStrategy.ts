import { PaymentResult, PaymentStrategy } from "./models/strategy.interface";

/**
 * PayPalPaymentStrategy implements the PaymentStrategy interface for processing PayPal payments.
 * It includes methods for validating payment data, calculating fees, and processing the payment.
 */
export class PayPalPaymentStrategy implements PaymentStrategy {
    constructor(
        private email: string,
        private apiKey: string
    ) { }

    async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        const startTime = Date.now();

        await new Promise(resolve => setTimeout(resolve, 800));

        if (!this.validatePaymentData()) {
            return {
                success: false,
                errorMessage: 'Invalid PayPal credentials',
                fees: 0,
                processingTime: Date.now() - startTime
            };
        }

        const success = Math.random() > 0.05; // 95% success rate
        const fees = this.calculateFees(amount);

        return {
            success,
            transactionId: success ? `PP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : undefined,
            errorMessage: success ? undefined : 'PayPal payment failed',
            fees,
            processingTime: Date.now() - startTime
        };
    }

    validatePaymentData(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email) && this.apiKey.length > 10;
    }

    calculateFees(amount: number): number {
        return amount * 0.034 + 0.49; // 3.4% + $0.49
    }

    getSupportedCurrencies(): string[] {
        return ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
    }
}
