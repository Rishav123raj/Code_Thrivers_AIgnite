const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleReceiptUpload } = require('../controllers/ocrController');

// Set up disk storage
const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (_req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });
  
  const upload = multer({ storage });
  
  // Correct route
  router.post('/scan', upload.single('receipt'), handleReceiptUpload);
  
  module.exports = router;