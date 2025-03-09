const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const upload = multer();

// Route to analyze the food image
router.post("/analyze-food-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Custom prompt for analyzing food-related images
    const prompt = `You are a nutrition and sustainability expert specialized in analyzing images related to food, meals, ingredients, and food storage.
    Analyze the uploaded image and provide:
    1. A clear description of the food or meal depicted in the image.
    2. Nutritional insights and health-related details about the food items.
    3. Recommendations for proper storage or preservation to minimize waste.
    4. Tips for optimizing usage of ingredients or leftovers.
    5. Suggestions for sustainable practices related to cooking, storing, or disposing of the food.`;

    const response = await model.generateContent([prompt, imagePart]);

    const result = await response.response.text();
    return res.json({ result });
  } catch (error) {
    console.error("Error analyzing image through Gemini:", error);
    return res.status(500).json({ error: "Failed to analyze the image." });
  }
});

module.exports = router;