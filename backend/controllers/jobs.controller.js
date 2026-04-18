const Job = require('../models/Job');
const User = require('../models/User');
const aiService = require('../services/ai.service');
const nudgeService = require('../services/nudge.service');

// ─── GET /api/jobs ─────────────────────────────────────────────────────────────
const getJobs = async (req, res) => {
  try {
    const filters = { status: 'active' };
    if (req.query.search) {
      filters.title = { $regex: req.query.search, $options: 'i' };
    }
    const jobs = await Job.find(filters).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error in getJobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── GET /api/jobs/suggestions ─────────────────────────────────────────────────
const getJobSuggestions = async (req, res) => {
  try {
    const user = req.user;
    const allJobs = await Job.find({ status: 'active' }).lean();
    
    if (!aiService || !aiService.calculateMatchScore) {
      return res.json({ success: true, data: allJobs.slice(0, 20) }); // Fallback for Phase 1
    }

    // Phase 2 Logic
    const scoredJobs = allJobs.map(job => {
      const { score, matchedSkills } = aiService.calculateMatchScore(user.skills, job.requiredSkills);
      return { ...job, matchScore: score, matchedSkills };
    });

    const suggestions = scoredJobs
      .filter(job => job.matchScore >= 2)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20);

    // Keep dashboard useful for new applicants with sparse profiles.
    if (suggestions.length === 0) {
      const fallbackJobs = [...scoredJobs]
        .sort((a, b) => {
          if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 20);
      return res.json({ success: true, data: fallbackJobs });
    }

    res.json({ success: true, data: suggestions });
  } catch (error) {
    console.error('Error in getJobSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job suggestions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── GET /api/jobs/:id ─────────────────────────────────────────────────────────
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    let result = { ...job };

    // Phase 2 Logic if userId is passed
    if (req.query.userId && aiService) {
      const user = await User.findById(req.query.userId).lean();
      if (user) {
        const { score, matchedSkills } = aiService.calculateMatchScore(user.skills, job.requiredSkills);
        result.matchScore = score;
        result.matchReason = await aiService.generateMatchReason(user, job, matchedSkills);
      }
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in getJobById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── POST /api/jobs ────────────────────────────────────────────────────────────
const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.user._id };
    const newJob = await Job.create(jobData);
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    console.error('Error in createJob:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── PUT /api/jobs/:id ─────────────────────────────────────────────────────────
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, lean: true });
    if (!updatedJob) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: updatedJob });
  } catch (error) {
    console.error('Error in updateJob:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── DELETE /api/jobs/:id ──────────────────────────────────────────────────────
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id).lean();
    if (!deletedJob) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error in deleteJob:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── GET /api/jobs/nudge ───────────────────────────────────────────────────────
const getUserNudge = async (req, res) => {
  try {
    const nudgeData = await nudgeService.getNudgeStatus(req.user._id, req.user.skills);
    res.json({ success: true, data: nudgeData });
  } catch (error) {
    console.error('Error in getUserNudge:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nudge status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  getJobs,
  getJobSuggestions,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getUserNudge
};
