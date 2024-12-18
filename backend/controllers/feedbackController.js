const Feedback = require('../models/feedback');

const submitFeedback = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();

        res.status(201).json({ message: 'Message Sent successfully', success: true });
    } catch (err) {
        console.error('Error submitting Message:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (err) {
        console.error('Error retrieving Messages:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    submitFeedback,
    getFeedbacks
};
