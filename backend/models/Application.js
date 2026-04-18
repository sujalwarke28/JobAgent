const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, default: '' },
  matchScore:  { type: Number, default: 0 },
  matchReason: { type: String, default: '' },
  aiEvaluation: { type: Object },

  status:      { type: String, enum: ['pending', 'accepted', 'rejected', 'interview'], default: 'pending' },
  appliedAt:   { type: Date, default: Date.now },
});

// ─── Prevent duplicate applications ──────────────────────────────────────────
ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
