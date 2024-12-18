import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Web from './components/Web/web';
import TicTacToe from './components/Web/TicTacToe';
import FeedbackForm from './components/Feedbaackform';
import FormPage from './components/Web/FormPage';
import Calculator from './components/Web/calculator';
import ScientificCalculator from './components/Web/ScientifiCalculator';
import MeasurementConversion from './components/Web/MeasurementConversion';
import MoneyConversion from './components/Web/MoneyConversion';
import Todolist from './components/Web/Todolist';
import AgeCalculator from './components/Web/AgeCalculator';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Web />} />
      <Route path="/TicTacToe" element={<TicTacToe />} />
      <Route path="/FeedbackForm" element={<FeedbackForm />} />
      <Route path="/FormPage" element={<FormPage />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/scientific-calculator" element={<ScientificCalculator />} />
                <Route path="/measurement-conversion" element={<MeasurementConversion />} />
                <Route path="/money-conversion" element={<MoneyConversion />} />
                <Route path="/Todolist" element={<Todolist />} />
                <Route path="/AgeCalculator" element={<AgeCalculator/>} />
                <Route path="/feedback" element={<FeedbackForm/>} />

    </Routes>
  );
}

export default App;
