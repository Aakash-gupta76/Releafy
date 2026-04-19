require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy");

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chatSession = model.startChat({ history: [] });
    const result = await chatSession.sendMessage("Hello");
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
