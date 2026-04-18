const Application = require('../models/Application');
const Job = require('../models/Job');
const aiService = require('../services/ai.service');

// ─── GET /api/applications ─────────────────────────────────────────────────────
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id })
      .populate('jobId', 'title company location salary status')
      .sort({ appliedAt: -1 })
      .lean();
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error in getUserApplications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── GET /api/applications/job/:jobId ──────────────────────────────────────────
const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate("applicantId", "displayName email skills photoURL resumeText experienceLevel")
      .sort({ matchScore: -1 })
      .lean();

    const job = await Job.findById(req.params.jobId).lean();

    if (job && applications.length > 0 && aiService && aiService.evaluateCandidate) {
      for (const app of applications) {
        if (app.applicantId && !app.aiEvaluation) {
          const evaluation = await aiService.evaluateCandidate(app.applicantId, job);
          app.aiEvaluation = evaluation;
          await Application.findByIdAndUpdate(app._id, { aiEvaluation: evaluation });
        }
      }
    }

    res.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error in getJobApplicants:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job applicants",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ─── POST /api/applications ────────────────────────────────────────────────────
const submitApplication = async (req, res) => {
  try {
    const { jobId, coverLetter, matchScore, matchReason } = req.body;
    
    // Check if already applied
    const existing = await Application.findOne({ jobId, applicantId: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job.' });
    }

    const application = await Application.create({
      jobId,
      applicantId: req.user._id,
      coverLetter,
      matchScore,
      matchReason
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error('Error in submitApplication:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── PUT /api/applications/:id ─────────────────────────────────────────────────
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected', 'interview'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, lean: true }
    );
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    
    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Error in updateApplicationStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// ─── POST /api/applications/generate-cover-letter ─────────────────────────────
const generateCoverLetter = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (!aiService) {
      return res.status(501).json({ success: false, message: 'AI Service not implemented yet' });
    }
    
    const job = await Job.findById(jobId).lean();
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const coverLetter = await aiService.generateCoverLetter(req.user, job);
    res.json({ success: true, data: { coverLetter } });
  } catch (error) {
    console.error('Error in generateCoverLetter:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate cover letter',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  getUserApplications,
  getJobApplicants,
  submitApplication,
  updateApplicationStatus,
  generateCoverLetter
};
