import React, { useState } from "react";
import '../Web/AgeCalculator.css';
import { useNavigate } from "react-router-dom";

const AgeCalculator = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [ageResult, setAgeResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const displayGreeting = () => {
    const name = document.getElementById("name").value;
    const greetingElement = document.getElementById("greeting");
    
    // Set the greeting message
    greetingElement.textContent = `Welcome, ${name}!`;
    
    // Add the animate class to trigger the animation
    greetingElement.classList.add('animate');
};

const navigate = useNavigate();

const handleBackToHome = () => {
    navigate('/'); // Adjust the route as needed
};

  const calculateAge = () => {
    if (!name || !dob) {
      alert('Please enter your name and date of birth.');
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - dobDate.getFullYear();
    let monthDifference = today.getMonth() - dobDate.getMonth();
    let dayDifference = today.getDate() - dobDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
      monthDifference += 12;
    }

    if (dayDifference < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      dayDifference += lastMonth;
      monthDifference--;
    }

    const result = `${name}, you are ${age} years ${monthDifference} months and ${dayDifference} days old.`;
    setAgeResult(result);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="age-calculator-body">
      <div className="age-calculator-container">
        <h1>Age Calculator</h1>
        <form id="ageCalculatorForm">
          <div>
            <label htmlFor="name">Enter Your Name please:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="question-mark-container">
              <span className="question-mark">?</span>
              <div className="tooltip">This is your Name field</div>
            </span>
            <div id="greeting" className="welcome-message"></div>
            <button type="button" onClick={displayGreeting}>Submit Name</button>
          </div>
          <label htmlFor="DateofBirth">Enter Your Date Of Birth (dd-mm-yyyy):</label>
          <input 
            type="date" 
            id="DateofBirth" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <span className="question-mark-container">
            <span className="question-mark">?</span>
            <div className="tooltip">This is your Date Of Birth field</div>
          </span>
          <button type="button" onClick={calculateAge}>Submit</button>
        </form>

        {modalVisible && (
          <div id="resultModal" className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p><span id="ageResult">{ageResult}</span></p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AgeCalculator;
