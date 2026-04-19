const express = require('express');
const router = express.Router();
const Affirmation = require('../models/Affirmation');

// Get all affirmations
router.get('/', async (req, res) => {
  try {
    const affirmations = await Affirmation.find({ isActive: true });
    res.json(affirmations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get random affirmation
router.get('/random', async (req, res) => {
  try {
    const affirmations = await Affirmation.find({ isActive: true });
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    res.json(randomAffirmation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get affirmations by category
router.get('/category/:category', async (req, res) => {
  try {
    const affirmations = await Affirmation.find({
      category: req.params.category,
      isActive: true
    });
    res.json(affirmations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new affirmation (admin only)
router.post('/', async (req, res) => {
  const affirmation = new Affirmation({
    text: req.body.text,
    category: req.body.category
  });

  try {
    const newAffirmation = await affirmation.save();
    res.status(201).json(newAffirmation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;