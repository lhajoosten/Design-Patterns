
import {
    StockExchange,
    PortfolioTracker,
} from './Observer';
import {
    TextEditor,
    CommandManager,
    CommandHistory,
    DeleteTextCommand,
    ReplaceTextCommand,
    InsertTextCommand
} from './Command/';
import {
    CreditCardPaymentStrategy,
    PayPalPaymentStrategy,
    CryptocurrencyPaymentStrategy
} from './Strategy';

// Observer Pattern Example
console.log('=== Observer Pattern: Stock Trading System ===');
const exchange = new StockExchange();
const portfolio1 = new PortfolioTracker('user123', 3);
const portfolio2 = new PortfolioTracker('user456', 5);

// Add holdings to portfolios
portfolio1.addHolding('AAPL', 100, 150.00);
portfolio1.addHolding('TSLA', 50, 800.00);
portfolio2.addHolding('AAPL', 200, 145.00);

// Subscribe to stock updates
exchange.subscribe(portfolio1);
exchange.subscribe(portfolio2);

// Simulate stock price updates
exchange.updateStock({
    symbol: 'AAPL',
    price: 155.75,
    change: 5.75,
    changePercent: 3.83,
    volume: 1000000,
    timestamp: new Date()
});

// Command Pattern Example
console.log('\n=== Command Pattern: Text Editor with Undo/Redo ===');
const editor = new TextEditor();
const commandManager = new CommandManager();

commandManager.executeCommand(new InsertTextCommand(editor, 'Hello ', 0));
commandManager.executeCommand(new InsertTextCommand(editor, 'World!', 6));
console.log('Content:', editor.getContent());

commandManager.undo();
console.log('After undo:', editor.getContent());

commandManager.executeCommand(new InsertTextCommand(editor, 'TypeScript!', 6));
console.log('After new command:', editor.getContent());

// Strategy Pattern Example
console.log('\n=== Strategy Pattern: Payment Processing ===');
async function processPayments() {
    const creditCard = new CreditCardPaymentStrategy(
        '4111111111111111',
        '123',
        '12/25',
        'John Doe'
    );

    const paypal = new PayPalPaymentStrategy(
        'user@example.com',
        'api_key_12345'
    );

    const amount = 100;
    const currency = 'USD';

    console.log('Processing credit card payment...');
    const ccResult = await creditCard.processPayment(amount, currency);
    console.log('Result:', ccResult);

    console.log('\nProcessing PayPal payment...');
    const ppResult = await paypal.processPayment(amount, currency);
    console.log('Result:', ppResult);
}

processPayments();