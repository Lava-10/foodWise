const axios = require("axios");

const getSignedUrl = async (req, res) => {
  try {
    const agentId = process.env.PUBLIC_AGENT_ID;
    const apiKey = process.env.XI_API_KEY;

    if (!agentId || !apiKey) {
      return res
        .status(400)
        .json({ error: "Missing required environment variables" });
    }

    const response = await axios.get(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to get signed URL");
    }

    res.json({ signedUrl: response.data.signed_url });
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to generate signed URL";
    res.status(500).json({ error: errorMessage });
  }
};

module.exports = { getSignedUrl };
