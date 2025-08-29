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
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Update registration
    try {
      const updateData = req.body;
      const db = await connectToDatabase();
      
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
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
