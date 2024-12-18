import React, { useState } from 'react';
import './certificate.css'; // Updated CSS file

const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
     'image5.jpg',
     'image6.jpg',
      'image7.jpg',
      'image8.jpg',
      'image9.jpg',
      'image10.jpg'
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showImage = (index) => {
        setCurrentIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="carousel-container">
            <button id="prevButton" className="arrow" onClick={handlePrevClick}>&#10094;</button>
            <img id="carouselImage" src={images[currentIndex]} alt="Carousel Image" />
            <button id="nextButton" className="arrow" onClick={handleNextClick}>&#10095;</button>
            <div className="indicator-container">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => showImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
