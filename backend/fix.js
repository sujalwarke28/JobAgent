const fs = require('fs');
const file = '/Users/sujalwarke/Desktop/PersonalOPS/Jobice/frontend/src/pages/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.endsWith(';\n}')) {
   content = content.replace(/<\/div>[\s\n]*<\/>$/, '    </>\n  );\n}\n');
   fs.writeFileSync(file, content);
}
