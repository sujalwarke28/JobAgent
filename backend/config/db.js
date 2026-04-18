const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // ─── Auto-seed if DB is empty ──────────────────────────────────────────────
    const Job = require('../models/Job');
    const count = await Job.countDocuments();
    if (count === 0) {
      console.log('📦 Database empty - running seed script...');
      require('../seed');
    }
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
