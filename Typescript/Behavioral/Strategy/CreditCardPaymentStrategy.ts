import { PaymentResult, PaymentStrategy } from "./models/strategy.interface";

/**
 * CreditCardPaymentStrategy implements the PaymentStrategy interface for processing credit card payments.
 * It includes methods for validating payment data, calculating fees, and processing the payment.
 */
export class CreditCardPaymentStrategy implements PaymentStrategy {
    constructor(
        private cardNumber: string,
        private cvv: string,
        private expiryDate: string,
        private cardholderName: string
    ) { }

    async processPayment(amount: number, currency: string): Promise<PaymentResult> {
        const startTime = Date.now();

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate validation
        if (!this.validatePaymentData()) {
            return {
                success: false,
                errorMessage: 'Invalid card details',
                fees: 0,
                processingTime: Date.now() - startTime
            };
        }

        // Simulate payment processing
        const success = Math.random() > 0.1; // 90% success rate
        const fees = this.calculateFees(amount);

        return {
            success,
            transactionId: success ? `CC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : undefined,
            errorMessage: success ? undefined : 'Payment declined by bank',
            fees,
            processingTime: Date.now() - startTime
        };
    }

    validatePaymentData(): boolean {
        const cardNumberRegex = /^\d{16}$/;
        const cvvRegex = /^\d{3,4}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

        return cardNumberRegex.test(this.cardNumber.replace(/\s/g, '')) &&
            cvvRegex.test(this.cvv) &&
            expiryRegex.test(this.expiryDate) &&
            this.cardholderName.length > 2;
    }

    calculateFees(amount: number): number {
        return amount * 0.029 + 0.30; // 2.9% + $0.30
    }

    getSupportedCurrencies(): string[] {
        return ['USD', 'EUR', 'GBP', 'CAD'];
    }
}

