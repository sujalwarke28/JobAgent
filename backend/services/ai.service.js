const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const calculateMatchScore = (userSkills = [], jobSkills = []) => {
  const normUser = userSkills.map(s => s.toLowerCase().trim());
  const normJob = jobSkills.map(s => s.toLowerCase().trim());

  const matchedSkills = normJob.filter(skill => normUser.includes(skill));
  
  const originalMatchedSkills = jobSkills.filter((_, idx) => 
    normUser.includes(normJob[idx])
  );

  return {
    score: matchedSkills.length,
    matchedSkills: originalMatchedSkills
  };
};

const generateMatchReason = async (userProfile, jobDetails, matchedSkills) => {
  if (!genAI) return "API Key missing. Based on your skills this appears to be a good match.";
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Why is this job a good fit? 
User skills: [${(userProfile.skills || []).join(', ')}], 
${userProfile.resumeText ? `User Resume Summary: ${userProfile.resumeText.substring(0, 1000)}` : ''}
Job requires: [${(jobDetails.requiredSkills || []).join(', ')}], 
Matched: [${matchedSkills.join(', ')}]. 
Provide a concise 2-3 sentence explanation directly without any preamble. Do not use conversational filler.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini AI Error (match reason):", error);
    return `You strongly match this job based on your proficiency in ${matchedSkills.join(', ')}.`;
  }
};

const generateCoverLetter = async (userProfile, jobDetails) => {
  if (!genAI) return "API Key missing. Please provide your own cover letter.";
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Write a professional cover letter for ${userProfile.displayName || 'a candidate'} applying to the ${jobDetails.title} role at ${jobDetails.company}.
The candidate has the following skills: ${(userProfile.skills || []).join(', ')}.
${userProfile.resumeText ? `Candidate Resume: ${userProfile.resumeText.substring(0, 1500)}` : ''}
Make sure to emphasize the alignment with their requirements, express enthusiasm for the role, and include a strong call to action.
Length: 200-300 words. Keep it highly professional. Do not include placeholder signature brackets at the bottom.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini AI Error (cover letter):", error);
    return "We encountered an error generating your cover letter via AI. Please prepare one manually.";
  }
};

const evaluateCandidate = async (userProfile, jobDetails) => {
  if (!genAI) return { score: 0, reasoning: 'API Key missing.', pros: [], cons: [] };
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Evaluate the candidate for the role of ${jobDetails.title} at ${jobDetails.company}.
Job Requirements: [${(jobDetails.requiredSkills || []).join(', ')}]
Job Description: ${jobDetails.description}

Candidate Skills: [${(userProfile.skills || []).join(', ')}]
Candidate Experience Level: ${userProfile.experienceLevel || 'Mid'}
Candidate Resume: ${userProfile.resumeText || 'Not provided'}

Return a JSON object with:
{
  "score": <number 1-100 indicating fit>,
  "reasoning": "<short paragraph explaining the score>",
  "pros": ["<pro1>", "<pro2>"],
  "cons": ["<con1>", "<con2>"]
}
Do not use markdown formatting.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonMatch);
  } catch (error) {
    console.error("Gemini AI Error (candidate evaluation):", error);
    return { score: 50, reasoning: 'Failed to evaluate via AI.', pros: ['Has relevant skills'], cons: ['Missing data'] };
  }
};

module.exports = {
  calculateMatchScore,
  generateMatchReason,
  generateCoverLetter,
  evaluateCandidate
};
