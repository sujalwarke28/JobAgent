const fs = require('fs');
const filePath = '/Users/sujalwarke/Desktop/PersonalOPS/Jobice/frontend/src/pages/ApplicantDashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Make sure that Applicant Dashboard doesn't have the Resume Upload anywhere anymore

content = content.replace(
  `import ResumeUpload from "../components/ResumeUpload";\n\nexport default function ApplicantDashboard()`,
  `export default function ApplicantDashboard()`
);

fs.writeFileSync(filePath, content);
console.log('ApplicantDashboard cleaned further');
