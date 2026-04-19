const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use the API key provided in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.json({ text: "Hello! I am currently operating in Demo Mode because a real Gemini API Key hasn't been entered in the backend .env file yet! However, the chat interface is fully connected to the backend and working flawlessly. 🍃" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are an empathetic, calm, and professional mental health and wellness AI assistant. Your goal is to listen, provide comforting advice, and help users manage their stress and anxiety. Keep responses concise, warm, and conversational. Do not provide medical diagnoses."
    });
    
    let cleanHistory = [];
    let lastRole = null;

    if (history && history.length > 0) {
      history.forEach(msg => {
        const mappedRole = msg.role === 'user' ? 'user' : 'model';
        
        // Gemini history MUST start with 'user'. Skip leading 'model' messages.
        if (cleanHistory.length === 0 && mappedRole === 'model') {
          return;
        }
        
        // Gemini history MUST strictly alternate. Merge consecutive same roles.
        if (mappedRole === lastRole) {
          cleanHistory[cleanHistory.length - 1].parts[0].text += '\n' + msg.text;
        } else {
          cleanHistory.push({ role: mappedRole, parts: [{ text: msg.text }] });
          lastRole = mappedRole;
        }
      });
    }

    const chatSession = model.startChat({
      history: cleanHistory
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();

    res.json({ text: responseText });

  } catch (error) {
    console.error("AI Chat Error:", error);
    if (error.message.includes("API key") || error.message.includes("key not valid") || error.message.includes("403")) {
      return res.status(500).json({ error: "Gemini API Key is invalid or missing in backend .env file." });
    }
    res.status(500).json({ error: "Failed to generate AI response. " + error.message });
  }
});

module.exports = router;
