import app from '../server/server.js';
import { connectDB } from '../server/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('Serverless MongoDB connection warning:', err.message);
  }
  return app(req, res);
}
