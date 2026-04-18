const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  company:        { type: String, required: true },
  description:    { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  location:       { type: String, default: 'Remote' },
  salary:         { type: String, default: 'Competitive' },
  postedBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status:         { type: String, enum: ['active', 'closed'], default: 'active' },
  createdAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', JobSchema);
