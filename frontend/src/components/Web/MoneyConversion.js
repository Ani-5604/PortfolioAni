import React, { useState } from 'react';
import './calculator.css';

const MoneyConversion = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [value, setValue] = useState('');

    const currencies = {
        USD: 'US Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
        JPY: 'Japanese Yen',
        AUD: 'Australian Dollar',
        CAD: 'Canadian Dollar',
        INR: 'Indian Rupee',
        CNY: 'Chinese Yuan',
    };

    const conversionRates = {
        USD: {
            USD:1.00,
            EUR: 0.93,
            GBP: 0.82,
            JPY: 137.51,
            AUD: 1.52,
            CAD: 1.36,
            INR: 82.65,
            CNY: 7.16,
        },
        EUR: {
            EUR:1.00,
            USD: 1.08,
            GBP: 0.88,
            JPY: 147.74,
            AUD: 1.63,
            CAD: 1.46,
            INR: 88.74,
            CNY: 7.69,
        },
        GBP:{

        }
        // Add other conversion rates here
        // ...
    };

    const convertMoney = () => {
        if (fromCurrency === toCurrency) {
            // If the from and to currencies are the same, no conversion is needed
            setResult(`${value} ${toCurrency}`);
        } else if (conversionRates[fromCurrency] && conversionRates[fromCurrency][toCurrency]) {
            const rate = conversionRates[fromCurrency][toCurrency];
            const convertedValue = Number(value) * rate;
            setResult(`${convertedValue.toFixed(2)} ${toCurrency}`);
        } else {
            setResult('Conversion not supported');
        }
    };
    return (
        <div className="money-conversion">
            <h2>Money Conversion</h2>

            <div className="conversion-inputs">
                <div>
                    <label>From: </label>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {Object.keys(currencies).map(currency => (
                            <option key={currency} value={currency}>{currencies[currency]}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>To: </label>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {Object.keys(currencies).map(currency => (
                            <option key={currency} value={currency}>{currencies[currency]}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Value: </label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>

            <button className="convert-button" onClick={convertMoney}>Convert</button>

            {result && (
                <div className="conversion-result">
                    <h3>Result: {result}</h3>
                </div>
            )}
        </div>
    );
};

export default MoneyConversion;
