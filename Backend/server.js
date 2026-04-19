const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/releafy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Releafy API' });
});

// Mood tracking routes
app.use('/api/mood', require('./routes/mood'));

// Affirmations routes
app.use('/api/affirmations', require('./routes/affirmations'));

// User routes
app.use('/api/users', require('./routes/users'));

// AI Chat routes
app.use('/api/ai', require('./routes/ai'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});