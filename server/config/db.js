import mongoose from 'mongoose';
import dns from 'dns';
import { ENV } from './env.js';
import { seedData } from '../seed/seed.js';
import User from '../models/User.js';

// Ensure public DNS resolver is active for SRV query resolution on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  console.warn('DNS server override note:', e.message);
}

let mongoMemoryServer = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  try {
    const maskedUri = (ENV.MONGODB_URI || '').replace(/:([^:@]+)@/, ':****@');
    console.log(`[MongoDB] Attempting connection to Atlas Cloud: ${maskedUri}...`);
    
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 6000,
    });
    
    console.log(`✨ [MongoDB Atlas Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);

    // Check if cloud database is empty and auto-seed
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 [MongoDB Atlas] Initializing & Seeding Luxury Wedding Demo Data to Cloud Atlas...');
      await seedData(false);
    } else {
      console.log(`📊 [MongoDB Atlas] Live DB Ready (${userCount} active users loaded).`);
    }

    return conn;
  } catch (error) {
    console.warn(`⚠️ [MongoDB Atlas Connection Issue] (${error.message})`);
    console.log(`🚀 [MongoDB Fallback] Initializing embedded In-Memory Mongo Database...`);

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();

      const memoryConn = await mongoose.connect(memoryUri, {
        autoIndex: true,
      });

      console.log(`✅ [MongoDB In-Memory Active] Connected: ${memoryUri}`);
      console.log('🌱 [MongoDB In-Memory] Auto-seeding luxury studio accounts & archives...');
      await seedData(false);
      return memoryConn;
    } catch (memError) {
      console.error(`❌ [MongoDB Fatal Error] Could not initialize database: ${memError.message}`);
    }
  }
};
