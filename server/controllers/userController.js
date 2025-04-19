const UserProfile = require('../models/UserProfile');
const { sendToGemini } = require('../services/geminiService');

exports.saveUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { name: req.body.name },
      { ...req.body },
      { upsert: true, new: true }
    );

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save profile', error });
  }
};

exports.getShoppingRecommendations = async (req, res) => {
  try {
    const { name, shoppingFrequency, dietaryPreference, budget, categoryPriorities, packaging } = req.body;
    
    const geminiPrompt = `
      Based on the following user preferences, recommend shopping items:
      Name: ${name}
      Shopping Frequency: ${shoppingFrequency}
      Dietary Preference: ${dietaryPreference}
      Budget: ₹${budget}
      Category Priorities: ${categoryPriorities.join(', ')}
      Preferred Packaging: ${packaging}

    Provide shopping behavior recommendations that are:
    1. Environmentally sustainable
    2. Budget-friendly
    3. Tailored to the user's lifestyle
    4. Focused on reducing food and packaging waste
    5. Offer product category and packaging alternatives
    6. Encourage community and local support if applicable
`;

    const geminiResponse = await sendToGemini(geminiPrompt);
    res.json({ geminiResponse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recommendations', error });
  }
};
