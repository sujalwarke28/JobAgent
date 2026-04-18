const fs = require('fs');
const filePath = '/Users/sujalwarke/Desktop/PersonalOPS/ai-job-copilot/frontend/src/pages/ApplicantDashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove Profile Section
content = content.replace(/\{\/\* Profile Section Start \*\/\}[\s\S]*?\{\/\* Profile Section End \*\/\}/g, '');

// Remove Resume Upload section
content = content.replace(/\{\/\* Resume Upload Section \*\/\}[\s\S]*?<ResumeUpload[\s\S]*?\/>\n\s+<\/div>/g, '');

fs.writeFileSync(filePath, content);
console.log('ApplicantDashboard cleaned');
