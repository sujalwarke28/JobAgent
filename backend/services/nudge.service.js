const Job = require('../models/Job');
const Application = require('../models/Application');
const { calculateMatchScore } = require('./ai.service');

const getNudgeStatus = async (userId, userSkills = []) => {
  try {
    // 1. Fetch all active jobs
    const allJobs = await Job.find({ status: 'active' }).lean();

    // 2. Identify jobs with strong match score (>= 3)
    const strongMatches = [];
    for (const job of allJobs) {
      const { score } = calculateMatchScore(userSkills, job.requiredSkills);
      if (score >= 3) {
        strongMatches.push({ ...job, matchScore: score });
      }
    }

    if (strongMatches.length === 0) {
      return { showNudge: false, count: 0, jobs: [] };
    }

    // 3. Fetch applications already created by this user
    const existingApplications = await Application.find({ applicantId: userId }, 'jobId').lean();
    const appliedJobIds = new Set(existingApplications.map(app => app.jobId.toString()));

    // 4. Filter to keep only jobs the user hasn't applied to yet
    const unappliedMatches = strongMatches.filter(job => 
      !appliedJobIds.has(job._id.toString())
    );

    return {
      showNudge: unappliedMatches.length > 0,
      count: unappliedMatches.length,
      jobs: unappliedMatches.sort((a, b) => b.matchScore - a.matchScore)
    };
  } catch (error) {
    console.error("Error in getNudgeStatus:", error);
    return { showNudge: false, count: 0, jobs: [] };
  }
};

module.exports = {
  getNudgeStatus
};
