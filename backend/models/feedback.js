const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Feedback = mongoose.model('feedbacks', feedbackSchema);

module.exports = Feedback;
