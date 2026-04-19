const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// Get all mood entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new mood entry
router.post('/', async (req, res) => {
  const mood = new Mood({
    userId: req.body.userId,
    mood: req.body.mood,
    stressLevel: req.body.stressLevel,
    notes: req.body.notes
  });

  try {
    const newMood = await mood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get mood statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId });
    const stats = {
      totalEntries: moods.length,
      averageStress: moods.reduce((sum, m) => sum + m.stressLevel, 0) / moods.length || 0,
      moodDistribution: {
        'very-sad': moods.filter(m => m.mood === 'very-sad').length,
        'sad': moods.filter(m => m.mood === 'sad').length,
        'neutral': moods.filter(m => m.mood === 'neutral').length,
        'happy': moods.filter(m => m.mood === 'happy').length,
        'very-happy': moods.filter(m => m.mood === 'very-happy').length
      }
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;