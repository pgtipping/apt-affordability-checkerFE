import { createPool } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { feedback } = req.body || {};
  if (!feedback || typeof feedback !== "string" || feedback.trim().length < 5) {
    return res
      .status(400)
      .json({ error: "Feedback must be at least 5 characters." });
  }

  try {
    const pool = createPool();
    await pool.sql`INSERT INTO feedback (content) VALUES (${feedback})`;
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
