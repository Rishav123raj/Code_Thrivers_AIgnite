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
    You are a helpful assistant. Analyze the following shopping receipt and provide clear, readable recommendations in a structured format.

    🧾 Receipt Analysis & Smart Suggestions

    📌 Instructions:
      - Begin with a short summary (1–2 lines).
      - Divide suggestions into the following sections:

    ✅ Healthier Alternatives  
    💰 Cheaper Alternatives  
    🚫 Unnecessary Purchases  

    - For each section:
      • Use **bullet points**
      • Make item names **bold**
      • Each bullet point should start on a new line
      • Add real line breaks between bullet points and sections
      • Keep each recommendation concise and easy to understand

    🔁 Format each section like this:

      ✅ Healthier Alternatives  
        • **ITEM NAME**: Recommendation goes here.  
        • **ITEM NAME 2**: Another tip.  

      💰 Cheaper Alternatives  
        • **ITEM NAME**: Suggest price comparison or quantity review.  

      🚫 Unnecessary Purchases  
        • **ITEM NAME**: Mention why this item may be unnecessary.  

    Now, analyze this receipt and provide your structured suggestions:
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