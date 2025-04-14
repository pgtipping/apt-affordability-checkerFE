// TODO: Implement AI model calling logic with OpenRouter and Gemini fallback

import { GoogleGenerativeAI } from "@google/generative-ai";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Define model IDs
const PRIMARY_MODEL = "deepseek/deepseek-chat-v3-0324";
const FALLBACK_MODEL = "google/gemma-3-27b-it"; // OpenRouter fallback
const FINAL_FALLBACK_MODEL = "gemini/gemma-3-27b-it"; // Gemini fallback (adjust if needed)

// Add timeoutMs parameter with a default (e.g., null or a very long default if needed)
async function callOpenRouter(modelId, prompt, timeoutMs = null) {
  // Placeholder for OpenRouter API call
  console.log(`Attempting to call OpenRouter with model: ${modelId}`);
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key not configured.");
  }
  let controller;
  let timeoutId;

  try {
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // Optional headers...
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: "user", content: prompt }],
        // max_tokens: 500, // Ensure this line is commented out or removed
        // temperature: 0.7,
      }),
    };

    // Add AbortController for timeout if timeoutMs is provided
    if (timeoutMs && timeoutMs > 0) {
      controller = new AbortController();
      fetchOptions.signal = controller.signal;
      timeoutId = setTimeout(() => {
        console.log(
          `OpenRouter call for ${modelId} timed out after ${timeoutMs}ms.`
        );
        controller.abort();
      }, timeoutMs);
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      fetchOptions
    );

    // Clear timeout if fetch completes before timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenRouter API Error Response:", errorBody);
      throw new Error(
        `OpenRouter API error (${response.status}): ${response.statusText}`
      );
    }

    const data = await response.json();

    if (
      !data.choices ||
      data.choices.length === 0 ||
      !data.choices[0].message?.content
    ) {
      console.error("Invalid response structure from OpenRouter:", data);
      throw new Error("Invalid response structure from OpenRouter.");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error(
      `Error calling OpenRouter model ${modelId}:`,
      error.name === "AbortError" ? "Request timed out" : error
    );
    // Re-throw the error
    throw error;
  }
}

async function callGemini(modelId, prompt) {
  console.log(`Attempting to call Gemini with model: ${modelId}`);
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured.");
  }

  try {
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelId }); // Use the provided modelId

    const result = await model.generateContent(prompt);
    const response = result.response; // Use await result.response() if using stream
    const text = response.text();

    if (!text) {
      console.error("Invalid response structure from Gemini:", response);
      throw new Error("Invalid response structure from Gemini.");
    }

    return text;
  } catch (error) {
    console.error(`Error calling Gemini model ${modelId}:`, error);
    // Re-throw the error to be caught by the main handler's fallback logic
    throw error;
  }
}

// Configure Vercel function max duration (Hobby max is 60s)
export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { formData, rentEstimates, affordabilityResults } = req.body;

  // Basic validation
  if (!formData || !rentEstimates || !affordabilityResults) {
    return res.status(400).json({
      error:
        "Missing required data: formData, rentEstimates, or affordabilityResults.",
    });
  }

  // Construct the prompt for the AI model
  // TODO: Refine this prompt significantly
  const prompt = `
    Generate a personalized summary and recommendations for a user considering renting an apartment.

    User's Financial Data:
    - Monthly Income: $${formData.totalMonthlyIncome || "Not provided"}
    - Total Savings: $${formData.totalSavings || "Not provided"}
    - Monthly Living Costs (excluding rent): $${
      formData.monthlyLivingCost || "Not provided"
    }
    - Planned Monthly Rent: $${formData.rent || "Not provided"}
    - Security Deposit: $${formData.securityDeposit || "Not provided"}
    - Moving & Setup Costs: $${formData.movingAndSetupCost || "Not provided"}
    - Evaluation Period (Months): ${formData.monthsToEvaluate || "Not provided"}

    Market Rent Estimate:
    - Average Rent in ZIP ${rentEstimates.zipCode || "N/A"}: $${
    rentEstimates.averageRent || "N/A"
  }
    - Source: ${rentEstimates.source || "N/A"}

    Affordability Calculation Results:
    ${JSON.stringify(affordabilityResults, null, 2)}

    Task:
    1. Briefly summarize the user's financial situation regarding this potential move.
    2. Compare the user's planned rent to the market average for the ZIP code.
    3. Comment on the affordability based on the provided calculation results.
    4. Provide 2-3 actionable recommendations or points to consider (e.g., negotiation points, savings goals, budget adjustments).
    5. DO NOT include a main header, only subheaders.
    Keep the tone helpful and encouraging. Format using markdown.
  `;

  try {
    let summary = "";
    try {
      // 1. Try Primary OpenRouter Model with 22s timeout
      summary = await callOpenRouter(PRIMARY_MODEL, prompt, 22000); // Adjusted timeout to 22s
    } catch (error1) {
      console.warn(
        `Primary model (${PRIMARY_MODEL}) failed: ${error1.message}. Trying OpenRouter fallback.`
      );
      try {
        // 2. Try Fallback OpenRouter Model with 22s timeout
        summary = await callOpenRouter(FALLBACK_MODEL, prompt, 22000); // Adjusted timeout to 22s
      } catch (error2) {
        console.warn(
          `Fallback model (${FALLBACK_MODEL}) failed: ${error2.message}. Trying Gemini fallback.`
        );
        try {
          // 3. Try Final Gemini Fallback Model
          summary = await callGemini(FINAL_FALLBACK_MODEL, prompt);
        } catch (error3) {
          console.error(`All AI models failed: ${error3.message}`);
          return res.status(500).json({
            error: "Failed to generate summary after multiple attempts.",
            details: error3.message,
          });
        }
      }
    }

    // REMOVED summary truncation logic
    res.status(200).json({ summary });
  } catch (err) {
    // This catch block might be redundant now due to inner catches, but kept for safety
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unknown error occurred. Please try again.";
    console.error("Error in generate-summary handler:", errorMessage, err); // Log the full error too
    res.status(500).json({
      error: "Internal server error generating summary.",
      details: errorMessage,
    });
  }
}
