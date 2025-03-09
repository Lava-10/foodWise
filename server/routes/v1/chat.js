const express = require("express");
const axios = require("axios");
const { openai } = require("../../config/openAI");

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { userMessage, previousMessages } = req.body;
    const messages = [
      { role: "system", content: "You are NutriBot, a helpful food sustainability and nutrition assistant. Your primary goal is to provide accurate, practical advice on reducing food waste, sustainable eating habits, proper food storage, nutrition tips, and efficient use of ingredients. Respond clearly and informatively, encouraging sustainable and healthy dietary practices." },
      ...previousMessages.map((msg) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: userMessage },
    ];

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const aiMessage = openaiResponse.choices[0]?.message?.content;
    if (aiMessage) {
      res.json({ message: aiMessage });
    } else {
      res.status(500).json({ error: "No message received from AI" });
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;