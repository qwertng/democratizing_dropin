const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'badminton_registration';

let db;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// API Routes

// Create a new registration
app.post('/api/registrations', async (req, res) => {
  try {
    const { name, phone, guests, slot } = req.body;
    
    // Validate required fields
    if (!name || !phone || guests === undefined || !slot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const registration = {
      name,
      phone,
      guests: parseInt(guests),
      slot,
      cancelled: false,
      createdAt: new Date()
    };

    const result = await db.collection('registrations').insertOne(registration);
    
    res.status(201).json({
      _id: result.insertedId,
      ...registration
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get registration by phone number
app.get('/api/registrations/phone/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    
    const registration = await db.collection('registrations')
      .findOne({ phone, cancelled: { $ne: true } });
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update registration
app.put('/api/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const result = await db.collection('registrations').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({ message: 'Registration updated successfully' });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all active registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await db.collection('registrations')
      .find({ cancelled: { $ne: true } })
      .sort({ createdAt: 1 })
      .toArray();
    
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
