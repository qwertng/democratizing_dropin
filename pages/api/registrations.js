import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'badminton_registration';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create a new registration
    try {
      const { name, phone, guests, slot } = req.body;
      
      // Validate required fields
      if (!name || !phone || guests === undefined || !slot) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const db = await connectToDatabase();
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
  } else if (req.method === 'GET') {
    // Get all active registrations
    try {
      const db = await connectToDatabase();
      const registrations = await db.collection('registrations')
        .find({ cancelled: { $ne: true } })
        .sort({ createdAt: 1 })
        .toArray();
      
      res.json(registrations);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
