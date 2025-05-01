import React, { useState } from 'react';
import './certificate.css'; // Ensure the CSS is updated

const certificates = [
    { image: 'image1.jpg', title: 'Certificate 1' },
    { image: 'image2.jpg', title: 'Certificate 2' },
    { image: 'image3.jpg', title: 'Certificate 3' },
    { image: 'image4.jpg', title: 'Certificate 4' },
    { image: 'image5.jpg', title: 'Certificate 5' },
    { image: 'image6.jpg', title: 'Certificate 6' },
    { image: 'image7.jpg', title: 'Certificate 7' },
    { image: 'image8.jpg', title: 'Certificate 8' },
    { image: 'image9.jpg', title: 'Certificate 9' },
    { image: 'image10.jpg', title: 'Certificate 10' },   { image: 'image1.jpg', title: 'Certificate 11' },
    { image: 'image2.jpg', title: 'Certificate 12' },
    { image: 'image3.jpg', title: 'Certificate 13' },
    { image: 'image4.jpg', title: 'Certificate 14' },
    { image: 'image5.jpg', title: 'Certificate 15' },
    { image: 'image6.jpg', title: 'Certificate 16' },
    { image: 'image7.jpg', title: 'Certificate 17' },
    { image: 'image8.jpg', title: 'Certificate 18' },
    { image: 'image9.jpg', title: 'Certificate 19' },
    { image: 'image10.jpg', title: 'Certificate 20' },   { image: 'image1.jpg', title: 'Certificate 1' },
    { image: 'image2.jpg', title: 'Certificate 2' },
    { image: 'image3.jpg', title: 'Certificate 3' },
    { image: 'image4.jpg', title: 'Certificate 4' },
    { image: 'image5.jpg', title: 'Certificate 5' },
    { image: 'image6.jpg', title: 'Certificate 6' },
    { image: 'image7.jpg', title: 'Certificate 7' },
    { image: 'image8.jpg', title: 'Certificate 8' },
    { image: 'image9.jpg', title: 'Certificate 9' },
    { image: 'image10.jpg', title: 'Certificate 10' }

];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const showImage = (index) => {
        setCurrentIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? certificates.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === certificates.length - 1 ? 0 : prevIndex + 1));
    };

    const openModal = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCertificate(null);
    };

    return (
        <div className="carousel-page">
            <div className="floating-certificates">
                {certificates.map((cert, index) => (
                    <div className="certificate-item-floating" key={index} style={{ animationDelay: `${index * 0.2}s` }} onClick={() => openModal(cert)}>
                        <img src={cert.image} alt={`Certificate ${index + 1}`} />
                        <h3>{cert.title}</h3>
                    </div>
                ))}
            </div>

            {/* Carousel */}
            <div className="carousel-container">
                <button id="prevButton" className="arrow" onClick={handlePrevClick}>&#10094;</button>

                <div className="carousel-display">
                    <a href="#" className="certificate-item">
                        <img src={certificates[currentIndex].image} alt={`Certificate ${currentIndex + 1}`} />
                        <h3>{certificates[currentIndex].title}</h3>
                        <p>Click to view more details</p>
                    </a>
                </div>

                <button id="nextButton" className="arrow" onClick={handleNextClick}>&#10095;</button>

                {/* Indicator for carousel */}
                <div className="indicator-container">
                    {certificates.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => showImage(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for Full Certificate View */}
            {isModalOpen && selectedCertificate && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedCertificate.image} alt={`Full Certificate`} />
                        <h3>{selectedCertificate.title}</h3>
                        <button className="close-modal" onClick={closeModal}>×</button> {/* "X" Close Button */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;
