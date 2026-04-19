const mongoose = require('mongoose');

const affirmationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['stress-relief', 'self-love', 'confidence', 'peace', 'general'],
    default: 'general'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Affirmation', affirmationSchema);