import { MongoClient } from 'mongodb';

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
  const { phone } = req.query;

  if (req.method === 'GET') {
    // Get registration by phone number
    try {
      const db = await connectToDatabase();
      
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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
