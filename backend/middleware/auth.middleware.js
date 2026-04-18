const admin = require('firebase-admin');

// ─── Initialize Firebase Admin SDK (lazy / safe) ───────────────────────────────
let firebaseInitialized = false;

const initializeFirebase = () => {
  if (firebaseInitialized) return;
  try {
    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId:   process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey:  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      firebaseInitialized = true;
      console.log('✅ Firebase Admin SDK initialized');
    } else {
      console.warn('⚠️  Firebase Admin credentials missing — token verification disabled');
    }
  } catch (err) {
    console.error('❌ Firebase Admin init error:', err.message);
  }
};

initializeFirebase();

// ─── Middleware ────────────────────────────────────────────────────────────────
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // ─── Development bypass: token is firebaseUid directly ──────────────────────
  if ((process.env.NODE_ENV === 'development' || !process.env.FIREBASE_PROJECT_ID) && token.startsWith('dev_')) {
    const User = require('../models/User');
    const uid = token.replace('dev_', '');
    const user = await User.findOne({ firebaseUid: uid }).lean();
    if (!user) return res.status(401).json({ success: false, message: 'Dev user not found' });
    req.user = user;
    return next();
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const User = require('../models/User');
    const user = await User.findOne({ firebaseUid: decoded.uid }).lean();
    if (!user) return res.status(401).json({ success: false, message: 'User not registered' });
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

module.exports = { verifyToken, requireAdmin };
