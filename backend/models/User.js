const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, required: true },
  email:       { type: String, required: true },
  displayName: { type: String, default: '' },
  photoURL:    { type: String, default: '' },
  role:        { type: String, enum: ['applicant', 'admin'], default: 'applicant' },
  skills:      { type: [String], default: [] },
  preferredRoles: { type: [String], default: [] },
  experienceLevel: { type: String, enum: ["Entry", "Mid", "Senior", "Executive"], default: "Mid" },
  resumeText: { type: String, default: "" },
  resumePdfBase64: { type: String, default: "" },

  companyName:   { type: String, default: '' },
  companyDetails: { type: String, default: '' },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
