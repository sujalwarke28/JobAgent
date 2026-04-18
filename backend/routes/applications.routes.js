const express = require('express');
const {
  getUserApplications,
  getJobApplicants,
  submitApplication,
  updateApplicationStatus,
  generateCoverLetter
} = require('../controllers/applications.controller');
const { verifyToken, requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// User routes
router.get('/', verifyToken, getUserApplications);
router.post('/', verifyToken, submitApplication);
router.post('/generate-cover-letter', verifyToken, generateCoverLetter);

// Admin routes
router.get('/job/:jobId', verifyToken, requireAdmin, getJobApplicants);
router.get('/:id/resume', verifyToken, requireAdmin, async (req, res) => {
  try {
    const app = await require('../models/Application').findById(req.params.id).populate('applicantId');
    if (!app || !app.applicantId || !app.applicantId.resumePdfBase64) {
      return res.status(404).send('Resume not found');
    }
    const pdfBuffer = Buffer.from(app.applicantId.resumePdfBase64, 'base64');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${app.applicantId.displayName || 'resume'}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send('Error fetching resume');
  }
});
router.put('/:id', verifyToken, requireAdmin, updateApplicationStatus);

module.exports = router;
