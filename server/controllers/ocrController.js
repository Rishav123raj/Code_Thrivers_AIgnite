const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const { sendToGemini } = require('./geminiController');

function parseReceiptText(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  let storeName = lines[0] || '';
  let date = '';
  let total = '';
  const items = [];

  lines.forEach(line => {
    if (!date && /(\d{2}\/\d{2}\/\d{4})/.test(line)) {
      date = line.match(/(\d{2}\/\d{2}\/\d{4})/)[0];
    }
    if (/total/i.test(line)) {
      total = line;
    }
    if (/\d/.test(line) && /rs|₹/i.test(line)) {
      items.push(line);
    }
  });

  return { storeName, date, items, total };
}

exports.handleReceiptUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, `../uploads/${req.file.filename}`);

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('apikey', process.env.OCR_SPACE_API_KEY);
    formData.append('isTable', 'true');
    formData.append('OCREngine', '2');

    const ocrRes = await axios.post('https://api.ocr.space/parse/image', formData, {
      headers: formData.getHeaders(),
    });

    const text = ocrRes.data.ParsedResults[0].ParsedText;
    console.log("OCR Text:", text);

    const prompt = `
    You are a smart and eco-conscious assistant. Analyze the following shopping receipt and provide a structured, user-friendly summary with actionable suggestions based on:

    🌱 Carbon Footprint  
    🥗 Nutritional Value  
    🛍️ Purchase Necessity & Sustainability  

    📌 Instructions:
      - Start with a **brief summary** (1–2 lines) of the overall receipt (e.g., healthy, high-impact, budget-friendly).
      - Provide recommendations under **clearly separated sections**:
  
    ✅ Healthier Alternatives  
    💰 Cheaper or Sustainable Alternatives  
    🌍 Lower Carbon Footprint Swaps  
    🚫 Unnecessary or High-Impact Purchases  

    Format:
      - Each section header on its own line.
      - Each suggestion on a **new line**, starting with a bullet (•).
      - Use **bold** for item names.
      - Add **TWO line breaks** between bullet points and between sections for readability.
      - Keep tone friendly, helpful, and non-judgmental.

    ✨ Tip: Suggest plant-based, local, seasonal, or unpackaged options when relevant. Mention estimated impact reduction if possible.

    Now, analyze this receipt and provide structured suggestions:
    ${text}
    `;
    
    const geminiResponse = await sendToGemini(prompt);
    const formattedResponse = geminiResponse.replace(/\\n/g, '\n');

    res.json({ extractedText: text, formattedResponse });
  } catch (error) {
    console.error('OCR Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'OCR or Gemini processing failed.' });
  }
};