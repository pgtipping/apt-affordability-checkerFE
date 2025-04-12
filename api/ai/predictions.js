export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || "https://api.example-ai.com/v1";

  try {
    const response = await fetch(`${baseUrl}/predictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });
    if (!response.ok) {
      throw new Error("Failed to get predictions");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("AI Prediction Error:", error);
    res.status(500).json({ error: "Failed to get predictions" });
  }
}
