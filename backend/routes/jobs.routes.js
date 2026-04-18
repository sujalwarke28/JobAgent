const express = require('express');
const {
  getJobs,
  getJobSuggestions,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getUserNudge
} = require('../controllers/jobs.controller');
const { verifyToken, requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Public / User routes
router.get('/', getJobs);
router.get('/nudge', verifyToken, getUserNudge);
router.get('/suggestions', verifyToken, getJobSuggestions);
router.get('/:id', getJobById);

// Admin routes
router.post('/', verifyToken, requireAdmin, createJob);
router.put('/:id', verifyToken, requireAdmin, updateJob);
router.delete('/:id', verifyToken, requireAdmin, deleteJob);

module.exports = router;
