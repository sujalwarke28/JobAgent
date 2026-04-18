require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
(async () => {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const res = await model.generateContent("hello");
        console.log(res.response.text());
    } catch(e) {
        console.error(e);
        const models = ["gemini-1.0-pro", "gemini-1.5-flash-latest"];
        for(let m of models) {
             console.log("Trying", m);
             try {
                const model = ai.getGenerativeModel({ model: m });
                await model.generateContent("hello");
                console.log(m, "works!");
             } catch(err) { console.log(m, "fails"); }
        }
    }
})();
