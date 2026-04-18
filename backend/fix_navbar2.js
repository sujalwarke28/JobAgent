const fs = require('fs');
const filePath = '/Users/sujalwarke/Desktop/PersonalOPS/Jobice/frontend/src/components/Navbar.jsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  `<Link to="/admin" className="text-gray-300 hover:text-white transition-colors">Admin Dashboard</Link>\n            <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>`,
  `<>\n              <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">Admin Dashboard</Link>\n              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>\n            </>`
);

fs.writeFileSync(filePath, content);
console.log('Fixed Navbar JSX Syntax error');
