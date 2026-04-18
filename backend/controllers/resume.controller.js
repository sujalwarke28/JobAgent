const pdfParse = require('pdf-parse');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const parseResumeAndExtractData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const dataBuffer = req.file.buffer;
    const data = await pdfParse(dataBuffer);
    const text = data.text;
    
    let extractedSkills = [];
    let extractedExperience = '';
    let extractedRoles = [];

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
        Analyze the following resume text and extract the following information in JSON format:
        {
          "skills": ["skill1", "skill2"],
          "experienceLevel": "Entry" | "Mid" | "Senior" | "Executive",
          "preferredRoles": ["role1", "role2"]
        }
        Do not include markdown tags like \`\`\`json. Just the JSON.

        Resume Text:
        ${text}
        `;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonMatch);
        
        extractedSkills = parsed.skills || [];
        extractedExperience = parsed.experienceLevel || 'Mid';
        extractedRoles = parsed.preferredRoles || [];
      } catch (err) {
        console.error('Gemini extraction failed, using fallbacks', err);
        // basic fallback extraction based on keywords could go here
      }
    }

    const updateFields = {
      resumeText: text,
      resumePdfBase64: dataBuffer.toString('base64')
    };
    
    if (extractedSkills.length > 0) updateFields.skills = extractedSkills;
    if (extractedExperience) updateFields.experienceLevel = extractedExperience;
    if (extractedRoles.length > 0) updateFields.preferredRoles = extractedRoles;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, lean: true }
    );

    res.json({ 
      success: true, 
      message: 'Resume parsed and profile updated',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error in parseResume:', error);
    res.status(500).json({ success: false, message: 'Failed to parse resume' });
  }
};

module.exports = { parseResumeAndExtractData };
