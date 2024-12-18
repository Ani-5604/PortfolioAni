// src/ScientificCalculator.js
import React, { useState } from 'react';
import './calculator.css';

// Helper functions for scientific operations
const factorial = (n) => {
    if (n < 0) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};

const nCr = (n, r) => {
    if (r > n) return NaN;
    return factorial(n) / (factorial(r) * factorial(n - r));
};

const nPr = (n, r) => {
    if (r > n) return NaN;
    return factorial(n) / factorial(n - r);
};

// Function to parse and evaluate expressions
const evaluateExpression = (expr) => {
    const nCrPattern = /(\d+)c(\d+)/g;
    const nPrPattern = /(\d+)p(\d+)/g;

    expr = expr.replace(nCrPattern, (match, p1, p2) => nCr(parseInt(p1), parseInt(p2)));
    expr = expr.replace(nPrPattern, (match, p1, p2) => nPr(parseInt(p1), parseInt(p2)));

    try {
        // eslint-disable-next-line no-eval
        return eval(expr);
    } catch (error) {
        return 'Error';
    }
};

const ScientificCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [waitingForR, setWaitingForR] = useState(false);

    const appendNumber = (num) => {
        setDisplay(prev => (prev === '0' ? num : prev + num));
    };

    const appendOperator = (opt) => {
        setDisplay(prev => prev + opt);
        if (opt === 'p') {
            setWaitingForR(true);
        }
    };

    const calculate = () => {
        const result = evaluateExpression(display);
        setDisplay(result.toString());
    };

    const clearDisplay = () => {
        setDisplay('0');
        setWaitingForR(false);
    };

    const applyScientificOperation = (op) => {
        if (waitingForR) {
            setDisplay(prev => prev + op);
            setWaitingForR(false);
        } else {
            setDisplay(prev => {
                const number = parseFloat(prev);
                switch (op) {
                    case 'log':
                        return Math.log10(number).toString();
                    case 'ln':
                        return Math.log(number).toString();
                    case 'exp':
                        return Math.exp(number).toString();
                    case 'sqrt':
                        return Math.sqrt(number).toString();
                    case 'inv':
                        return (1 / number).toString();
                    case 'fact':
                        return factorial(number).toString();
                    default:
                        return prev;
                }
            });
        }
    };

    return (
        <div className="calculator">
            <div className="calculator-label">Scientific Calculator</div>
            <div className="display" id="display">{display}</div>
            <div className="button-grid">
                <button className="btn number" onClick={() => appendNumber('1')}>1</button>
                <button className="btn number" onClick={() => appendNumber('2')}>2</button>
                <button className="btn number" onClick={() => appendNumber('3')}>3</button>
                <button className="btn operator" onClick={() => appendOperator('+')}>+</button>

                <button className="btn number" onClick={() => appendNumber('4')}>4</button>
                <button className="btn number" onClick={() => appendNumber('5')}>5</button>
                <button className="btn number" onClick={() => appendNumber('6')}>6</button>
                <button className="btn operator" onClick={() => appendOperator('-')}>-</button>

                <button className="btn number" onClick={() => appendNumber('7')}>7</button>
                <button className="btn number" onClick={() => appendNumber('8')}>8</button>
                <button className="btn number" onClick={() => appendNumber('9')}>9</button>
                <button className="btn operator" onClick={() => appendOperator('*')}>*</button>

                <button className="btn number" onClick={() => appendNumber('0')}>0</button>
                <button className="btn operator" onClick={() => appendOperator('/')}>/</button>
                <button className="btn equal" onClick={calculate}>=</button>
                <button className="btn clear" onClick={clearDisplay}>C</button>
                
                <button className="btn operator" onClick={() => appendOperator('c')}>nCr</button>
                <button className="btn operator" onClick={() => applyScientificOperation('log')}>log</button>
                <button className="btn operator" onClick={() => applyScientificOperation('ln')}>ln</button>
                <button className="btn operator" onClick={() => applyScientificOperation('exp')}>exp</button>
                <button className="btn operator" onClick={() => applyScientificOperation('sqrt')}>√</button>
                <button className="btn operator" onClick={() => applyScientificOperation('inv')}>1/x</button>
                <button className="btn operator" onClick={() => applyScientificOperation('fact')}>x!</button>
                <button className="btn operator" onClick={() => appendOperator('p')}>nPr</button>
            </div>
        </div>
    );
};

export default ScientificCalculator;
