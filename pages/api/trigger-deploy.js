// pages/api/trigger-deploy.js
import axios from "axios";

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Get the secret key from request (e.g., header or query param)
  // Using a header like 'Authorization: Bearer YOUR_SECRET_KEY_HERE' is more secure
  const providedSecret = req.headers.authorization?.split(" ")[1]; // Assumes Bearer token

  // Get expected secrets from environment variables
  const expectedSecret = process.env.VERCEL_DEPLOY_TRIGGER_SECRET;
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

  // --- Input Validation ---
  if (!expectedSecret || !deployHookUrl) {
    console.error(
      "Missing VERCEL_DEPLOY_TRIGGER_SECRET or VERCEL_DEPLOY_HOOK_URL environment variables."
    );
    return res.status(500).json({ message: "Server configuration error." });
  }

  if (!providedSecret) {
    console.warn("Trigger deploy attempt without secret key.");
    return res.status(401).json({ message: "Missing authorization token." });
  }

  // --- Authorization ---
  if (providedSecret !== expectedSecret) {
    console.warn("Trigger deploy attempt with invalid secret key.");
    return res.status(403).json({ message: "Invalid authorization token." });
  }

  // --- Trigger Deploy Hook ---
  try {
    console.log(`Triggering Vercel deploy hook: ${deployHookUrl}`);
    // Vercel deploy hooks typically expect a POST request
    const deployResponse = await axios.post(deployHookUrl);

    // Check Vercel's response if needed (structure might vary)
    // console.log("Vercel Deploy Hook Response Status:", deployResponse.status);
    // console.log("Vercel Deploy Hook Response Data:", deployResponse.data);

    // Respond success to the cron job
    res.status(200).json({ message: "Deployment triggered successfully." });
  } catch (error) {
    console.error("Error triggering Vercel deploy hook:", error.message);
    // Log more details if available
    if (error.response) {
      console.error("Deploy Hook Error Status:", error.response.status);
      console.error("Deploy Hook Error Data:", error.response.data);
    }
    res.status(500).json({ message: "Failed to trigger deployment." });
  }
}
