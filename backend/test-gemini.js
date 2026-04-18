require('dotenv').config();
const key = process.env.GEMINI_API_KEY;
if (!key) { console.log('No GEMINI_API_KEY'); process.exit(1); }
fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
  .then(r => r.json())
  .then(res => {
    if (res.models) {
      console.log('Available models:', res.models.map(m => m.name).join(', '));
    } else {
      console.log('Error listing models:', res);
    }
  })
  .catch(console.error);
