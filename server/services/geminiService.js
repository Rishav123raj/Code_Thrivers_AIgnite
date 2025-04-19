const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.sendToGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text(); // Assuming Gemini returns a response with a text field
  } catch (error) {
    console.error('Gemini Error:', error.message);
    return 'Error generating suggestions.';
  }
};
