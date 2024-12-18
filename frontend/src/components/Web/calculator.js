import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './calculator.css';
import FeedbackForm from './Feedbaackform'; // Ensure this is the correct import
import ScientificCalculator from './ScientifiCalculator'; // Ensure this is the correct import
import MeasurementConversion from './MeasurementConversion'; // Ensure this is the correct import
import MoneyConversion from './MoneyConversion'; // Ensure this is the correct import
import AgeCalculator from './AgeCalculator';


const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [view, setView] = useState('basic');
    const navigate = useNavigate();

    const appendNumber = (num) => {
        if (display === '0') {
            setDisplay(num);
        } else {
            setDisplay(display + num);
        }
    };

    const appendOperator = (opt) => {
        setDisplay(display + ' ' + opt + ' ');
    };

    const calculate = () => {
        try {
            setDisplay(eval(display));
        } catch (error) {
            setDisplay('Error');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleViewChange = (viewName) => {
        setView(viewName);
    };

    return (
        <div className="calculator-container">
            <div className="calculator-header">
                <h2>My Multi-Functional Calculator</h2>
            </div>
            <div className="calculator-wrapper">
                <div className="app-content">
                    {view === 'basic' && (
                        <div className="basic-calculator">
                            <div className="display">{display}</div>
                            <div className="button-grid">
                                <button className="btn" onClick={() => appendNumber('1')}>1</button>
                                <button className="btn" onClick={() => appendNumber('2')}>2</button>
                                <button className="btn" onClick={() => appendNumber('3')}>3</button>
                                <button className="btn operator" onClick={() => appendOperator('+')}>+</button>
                                <button className="btn" onClick={() => appendNumber('4')}>4</button>
                                <button className="btn" onClick={() => appendNumber('5')}>5</button>
                                <button className="btn" onClick={() => appendNumber('6')}>6</button>
                                <button className="btn operator" onClick={() => appendOperator('-')}>-</button>
                                <button className="btn" onClick={() => appendNumber('7')}>7</button>
                                <button className="btn" onClick={() => appendNumber('8')}>8</button>
                                <button className="btn" onClick={() => appendNumber('9')}>9</button>
                                <button className="btn operator" onClick={() => appendOperator('*')}>*</button>
                                <button className="btn clear" onClick={clearDisplay}>C</button>
                                <button className="btn" onClick={() => appendNumber('0')}>0</button>
                                <button className="btn equal" onClick={calculate}>=</button>
                                <button className="btn operator" onClick={() => appendOperator('/')}>/</button>
                            </div>
                        </div>
                    )}
                    {view === 'scientific' && <ScientificCalculator />}
                    {view === 'measurement' && <MeasurementConversion />}
                    {view === 'money' && <MoneyConversion />}
                    {view === 'age' && <AgeCalculator />}
                    {view === 'feedback' && <FeedbackForm />}
                    
                </div>
                <div className="button-controls">
                    <button className="btn-nav" onClick={() => handleViewChange('basic')}>Basic Calculator</button>
                    <button className="btn-nav" onClick={() => handleViewChange('scientific')}>Scientific Calculator</button>
                    <button className="btn-nav" onClick={() => handleViewChange('measurement')}>Measurement Conversion</button>
                    <button className="btn-nav" onClick={() => handleViewChange('money')}>Money Conversion</button>
                    
                    <button className="btn-nav" onClick={() => handleViewChange('age')}>AgeCalculator</button>
                   
                   
                   
                </div>
           <p>GIVE YOUR FEEDBACK     👉<button className="btn-back-home" onClick={() => handleViewChange('feedback')}>Feedback</button></p><br></br>
                <p>Back to Home 👉<button className="btn-back-home" onClick={handleBackToHome}>Back to Home</button></p>
            </div>
         
        </div>
    );
};

export default Calculator;