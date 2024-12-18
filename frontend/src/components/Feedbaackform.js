import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.css'
const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };
    const handleBackToHome = () => {
        navigate('/'); // Adjust the route as needed
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setLoading(true);
        setErrors({});
        try {
            // Here you would typically handle form submission, e.g., sending data to an API
            console.log('Form submitted:', formData);
            // Simulate a successful submission with a timeout
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSubmitted(true);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-container">
            <h2>Contact Form</h2>
            {submitted ? (
                <div className="thank-you-message">
                    <h3>Thank you for your feedback!</h3>
                </div>
            ) : (
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            )}  <button onClick={handleBackToHome} className="back-to-home-button">
            Back to Home
        </button>
        </div>
    );
};

export default FeedbackForm;
