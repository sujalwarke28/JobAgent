const fs = require('fs');
const filePath = '/Users/sujalwarke/Desktop/PersonalOPS/Jobice/frontend/src/components/Navbar.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const profileLinkStr = `              <Link to="/applications" className="text-gray-300 hover:text-white transition-colors">My Applications</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>`;

content = content.replace(/<Link to="\/applications" className="text-gray-300 hover:text-white transition-colors">My Applications<\/Link>/g, profileLinkStr);

content = content.replace(/<Link to="\/admin" className="text-gray-300 hover:text-white transition-colors">Admin Dashboard<\/Link>/g, `<Link to="/admin" className="text-gray-300 hover:text-white transition-colors">Admin Dashboard</Link>\n            <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>`);

fs.writeFileSync(filePath, content);
console.log('Fixed Navbar');
