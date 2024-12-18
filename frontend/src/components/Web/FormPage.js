import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './FormPage.css';

const images = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.jpg',
  'img9.jpg', 
  'img10.jpg',
  'img11.jpg',
  'imG12.jpg',
  'img13.jpg',
  'img14.jpg',
  'img15.jpg', 'img16.jpg',
  'img16.jpg',
  'img9.jpg',// Add more images as needed
];

function FormPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="form-page">
      <h1>Student Admission Form</h1>
      <img
        src={images[currentIndex]}
        alt="Student Admission Form"
        className="form-image" // Use CSS class for styling
      />
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePrevClick}>‹</button>
        <button className="nav-button" onClick={handleNextClick}>›</button>
      </div>
      <button className="back-home-button" onClick={handleBackClick}>Back to Home</button>
    </div>
  );
}

export default FormPage;
