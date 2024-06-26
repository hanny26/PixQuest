const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 5000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Schema and Model
const DataSchema = new mongoose.Schema({
  description: String,
  image: String // Assuming a base64 string for simplicity
});

const Data = mongoose.model('Data', DataSchema);

// Routes
app.post('/api/data', async (req, res) => {
  const { description, image } = req.body;
  try {
    const newData = new Data({ description, image });
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error("error saving data", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
