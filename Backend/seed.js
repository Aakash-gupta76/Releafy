const mongoose = require('mongoose');
const Affirmation = require('./models/Affirmation');
require('dotenv').config();

const affirmations = [
  { text: "I am worthy of peace and tranquility", category: "peace" },
  { text: "My mind is calm and my heart is at ease", category: "stress-relief" },
  { text: "I release all tension and embrace relaxation", category: "stress-relief" },
  { text: "I am in control of my thoughts and emotions", category: "confidence" },
  { text: "Every breath brings me more peace", category: "peace" },
  { text: "I choose to let go of what I cannot control", category: "stress-relief" },
  { text: "I am deserving of love and kindness", category: "self-love" },
  { text: "My body and mind are healing and strong", category: "self-love" },
  { text: "I trust in my ability to handle challenges", category: "confidence" },
  { text: "Peace flows through me with every breath", category: "peace" },
  { text: "I am grateful for this moment of calm", category: "general" },
  { text: "I choose thoughts that serve my well-being", category: "general" },
  { text: "I am safe, I am calm, I am at peace", category: "peace" }
];

async function seedAffirmations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Affirmation.deleteMany({});
    await Affirmation.insertMany(affirmations);
    console.log('Affirmations seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding affirmations:', error);
    process.exit(1);
  }
}

seedAffirmations();