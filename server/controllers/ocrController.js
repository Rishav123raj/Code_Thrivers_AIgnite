const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const PDFDocument = require('pdfkit'); // <== Add this
const { sendToGemini } = require('./geminiController');

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

    const prompt = `Analyze the following shopping receipt and suggest 2 ways the user can reduce unnecessary spending or make eco-friendly choices:\n\n${text}`;
    const geminiResponse = await sendToGemini(prompt);

    // Create a PDF
    const pdfDoc = new PDFDocument();
    const pdfPath = path.join(__dirname, `../downloads/receipt-analysis-${Date.now()}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(writeStream);

    pdfDoc.fontSize(16).text('Shopping Receipt Analysis & Recommendations\n', { underline: true });
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text(`Extracted Text:\n${text}`);
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text(`Gemini Recommendations:\n${geminiResponse}`);

    pdfDoc.end();

    writeStream.on('finish', () => {
      res.download(pdfPath, 'Gemini_Recommendations.pdf', (err) => {
        if (err) {
          console.error('Error downloading PDF:', err);
          res.status(500).json({ error: 'Failed to download PDF.' });
        } else {
          // Optional: remove PDF after download
          fs.unlinkSync(pdfPath);
        }
      });
    });

  } catch (error) {
    console.error('OCR Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'OCR or Gemini processing failed.' });
  }
};
