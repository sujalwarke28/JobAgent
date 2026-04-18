const express = require('express');
const multer = require('multer');
const { parseResumeAndExtractData } = require('../controllers/resume.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', verifyToken, upload.single('resume'), parseResumeAndExtractData);

module.exports = router;
