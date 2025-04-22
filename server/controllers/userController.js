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
      Based on the following user preferences, recommend shopping items and provide actionable suggestions:  

**User Profile:**  
- **Name:** ${name}  
- **Shopping Frequency:** ${shoppingFrequency}  
- **Dietary Preference:** ${dietaryPreference}  
- **Budget:** ₹${budget}  
- **Category Priorities:** ${categoryPriorities.join(', ')}  
- **Preferred Packaging:** ${packaging}  

**Provide recommendations in a structured bullet-point format with clear sections:**  

### **Recommended Shopping Items:**  
- (List specific products or categories tailored to preferences)  
- Prioritize local, seasonal, or sustainable options where applicable.  

### **Packaging & Waste Reduction Tips:**  
- Suggest eco-friendly alternatives (e.g., bulk bins, reusable containers).  
- Avoid single-use plastics by recommending X, Y, Z.  

### **Budget-Friendly Strategies:**  
- Compare cost-effective alternatives (e.g., store brands, bulk purchases).  
- Highlight seasonal discounts or local farmer’s markets.  

### **Lifestyle Adjustments for Sustainability:**  
- Tips to align shopping habits with frequency (e.g., meal planning for infrequent shoppers).  
- Ways to reduce food waste (e.g., preservation techniques, portioning).  

### **Community & Local Support (if applicable):**  
- Suggest nearby cooperatives, zero-waste stores, or local brands.  

**Keep recommendations:**  
1. Environmentally sustainable  
2. Budget-conscious  
3. Personalized to user preferences  
4. Actionable and easy to follow  
`;

    const geminiResponse = await sendToGemini(geminiPrompt);
    res.json({ geminiResponse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recommendations', error });
  }
};
