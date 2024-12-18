import React, { useState } from 'react';
import './calculator.css';

const MeasurementConversion = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [fromUnit, setFromUnit] = useState('gram (g)');
    const [toUnit, setToUnit] = useState('kilogram (kg)');
    const [category, setCategory] = useState('weight');
    const [value,setValue]=useState('value');

    const units = {
        weight: ['gram (g)', 'kilogram (kg)', 'pound (lb)', 'ounce (oz)'],
        height: ['meter (m)', 'centimeter (cm)', 'inch (in)', 'foot (ft)'],
        volume: ['liter (L)', 'milliliter (mL)', 'cubic meter (m³)', 'cubic centimeter (cm³)'],
        distance: ['kilometer (km)', 'meter (m)', 'mile (mi)', 'yard (yd)'],
        length: ['meter (m)', 'centimeter (cm)', 'millimeter (mm)', 'inch (in)'],
        temperature: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
        speed: ['meter per second (m/s)', 'kilometer per hour (km/h)', 'mile per hour (mph)']
    };

    const conversionTable = {
        weight: {
            'gram (g)': {
                'kilogram (kg)': 0.001,
                'pound (lb)': 0.00220462,
                'ounce (oz)': 0.035274,
            },
            'kilogram (kg)': {
                'gram (g)': 1000,
                'pound (lb)': 2.20462,
                'ounce (oz)': 35.274,
            },
            'pound (lb)': {
                'gram (g)': 453.592,
                'kilogram (kg)': 0.453592,
                'ounce (oz)': 16,
            },
            'ounce (oz)': {
                'gram (g)': 28.3495,
                'kilogram (kg)': 0.0283495,
                'pound (lb)': 0.0625,
            },
        },
        height: {
            'meter (m)': {
                'centimeter (cm)': 100,
                'inch (in)': 39.3701,
                'foot (ft)': 3.28084,
            },
            'centimeter (cm)': {
                'meter (m)': 0.01,
                'inch (in)': 0.393701,
                'foot (ft)': 0.0328084,
            },
            'inch (in)': {
                'meter (m)': 0.0254,
                'centimeter (cm)': 2.54,
                'foot (ft)': 0.0833333,
            },
            'foot (ft)': {
                'meter (m)': 0.3048,
                'centimeter (cm)': 30.48,
                'inch (in)': 12,
            },
        },
        volume: {
            'liter (L)': {
                'milliliter (mL)': 1000,
                'cubic meter (m³)': 0.001,
                'cubic centimeter (cm³)': 1000,
            },
            'milliliter (mL)': {
                'liter (L)': 0.001,
                'cubic meter (m³)': 1e-6,
                'cubic centimeter (cm³)': 1,
            },
            'cubic meter (m³)': {
                'liter (L)': 1000,
                'milliliter (mL)': 1e6,
                'cubic centimeter (cm³)': 1e6,
            },
            'cubic centimeter (cm³)': {
                'liter (L)': 0.001,
                'milliliter (mL)': 1,
                'cubic meter (m³)': 1e-6,
            },
        },
        distance: {
            'kilometer (km)': {
                'meter (m)': 1000,
                'mile (mi)': 0.621371,
                'yard (yd)': 1094,
            },
            'meter (m)': {
                'kilometer (km)': 0.001,
                'mile (mi)': 0.000621371,
                'yard (yd)': 1.09361,
            },
            'mile (mi)': {
                'kilometer (km)': 1.60934,
                'meter (m)': 1609.34,
                'yard (yd)': 1760,
            },
            'yard (yd)': {
                'kilometer (km)': 0.0009144,
                'meter (m)': 0.9144,
                'mile (mi)': 0.000568182,
            },
        },
        length: {
            'meter (m)': {
                'centimeter (cm)': 100,
                'millimeter (mm)': 1000,
                'inch (in)': 39.3701,
            },
            'centimeter (cm)': {
                'meter (m)': 0.01,
                'millimeter (mm)': 10,
                'inch (in)': 0.393701,
            },
            'millimeter (mm)': {
                'meter (m)': 0.001,
                'centimeter (cm)': 0.1,
                'inch (in)': 0.0393701,
            },
            'inch (in)': {
                'meter (m)': 0.0254,
                'centimeter (cm)': 2.54,
                'millimeter (mm)': 25.4,
            },
        },
        temperature: {
            'Celsius (°C)': {
                'Fahrenheit (°F)': (c) => (c * 9/5) + 32,
                'Kelvin (K)': (c) => c + 273.15,
            },
            'Fahrenheit (°F)': {
                'Celsius (°C)': (f) => (f - 32) * 5/9,
                'Kelvin (K)': (f) => (f - 32) * 5/9 + 273.15,
            },
            'Kelvin (K)': {
                'Celsius (°C)': (k) => k - 273.15,
                'Fahrenheit (°F)': (k) => (k - 273.15) * 9/5 + 32,
            },
        },
        speed: {
            'meter per second (m/s)': {
                'kilometer per hour (km/h)': 3.6,
                'mile per hour (mph)': 2.23694,
            },
            'kilometer per hour (km/h)': {
                'meter per second (m/s)': 0.277778,
                'mile per hour (mph)': 0.621371,
            },
            'mile per hour (mph)': {
                'meter per second (m/s)': 0.44704,
                'kilometer per hour (km/h)': 1.60934,
            },
        },
    };

    const handleCategoryChange = (category) => {
        setCategory(category);
        setFromUnit(units[category][0]);
        setToUnit(units[category][1]);
    };

    const convert = () => {
        if (conversionTable[category]) {
            const categoryConversions = conversionTable[category];
            let convertedValue = '';

            if (typeof categoryConversions[fromUnit][toUnit] === 'function') {
                convertedValue = categoryConversions[fromUnit][toUnit](Number(value));
            } else {
                const conversionFactor = categoryConversions[fromUnit][toUnit] || 1;
                convertedValue = Number(value) * conversionFactor;
            }

            setResult(`${convertedValue.toFixed(2)} ${toUnit}`);
        } else {
            setResult('Conversion not supported');
        }
    };

    return (
        <div className="measurement-conversion">
            <h2>Measurement Conversion</h2>

            <div className="category-select">
                <label>Category: </label>
                <select onChange={(e) => handleCategoryChange(e.target.value)} value={category}>
                    {Object.keys(units).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="conversion-inputs">
                <div>
                    <label>From: </label>
                    <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                        {units[category].map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>To: </label>
                    <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                        {units[category].map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
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

            <button className="convert-button" onClick={convert}>Convert</button>

            {result && (
                <div className="conversion-result">
                    <h3>Result: {result}</h3>
                </div>
            )}
        </div>
    );
};

export default MeasurementConversion;
