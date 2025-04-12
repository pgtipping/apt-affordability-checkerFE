import axios from "axios";

const AIService = {
  // Configuration
  config: {
    apiKey: process.env.REACT_APP_AI_API_KEY,
    baseUrl:
      process.env.REACT_APP_AI_BASE_URL || "https://api.example-ai.com/v1",
  },

  // Get rent estimates for a location
  async getRentEstimates(location) {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/rent-estimates`,
        {
          location,
          bedrooms: 1, // Default to 1 bedroom, can be parameterized
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("AI Rent Estimate Error:", error);
      throw error;
    }
  },

  // Get personalized recommendations based on user data
  async getRecommendations(userData) {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/recommendations`,
        {
          ...userData,
          preferences: {}, // Can be extended with user preferences
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      throw error;
    }
  },

  // Get predictive cost analytics
  async getCostPredictions(historicalData) {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/predictions`,
        {
          data: historicalData,
          timeframe: "12 months", // Default timeframe
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("AI Prediction Error:", error);
      throw error;
    }
  },

  // Get natural language insights
  async getInsights(analysisData) {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/insights`,
        {
          data: analysisData,
          style: "concise", // Can be parameterized
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("AI Insight Generation Error:", error);
      throw error;
    }
  },
  // Get rent estimate from local serverless endpoint (RentCast)
  async getLocalRentEstimate({ address, bedrooms, bathrooms, sqft }) {
    // Mock rent estimate data to avoid API calls
    return {
      estimatedRent: 2500,
      confidence: 0.8,
      source: "Mock Data",
      details: {
        address,
        bedrooms,
        bathrooms,
        sqft,
        latitude: 40.7128,
        longitude: -74.006,
      },
    };
  },
};

export default AIService;
