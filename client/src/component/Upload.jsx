import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle camera click
  const handleCameraClick = () => {
    alert("Camera functionality not yet implemented.");
  };

  // Handle file upload and OCR API request
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true); // Set loading state

    const formData = new FormData();
    formData.append('receipt', file);

    try {
      const res = await axios.post('/api/ocr/scan', formData);
      setResponse(res.data?.geminiResponse || 'No response');
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponse('Failed to upload or process receipt');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Receipt</h1>

      <div className="upload-sections">
        {/* Receipt Scanner */}
        <div className="scanner-box">
          <h2>Receipt Scanner</h2>
          <p>Upload or take a photo of your shopping receipt to analyze your purchases</p>
          <div className="dropzone">
            <div className="upload-icon">📤</div>
            <p>Drag and drop your receipt or<br />PNG, JPG or PDF up to 10MB</p>
            <div className="button-group">
              <label className="upload-btn">
                <span>📁 Select File</span>
                <input type="file" onChange={handleFileChange} hidden />
              </label>
              <button className="camera-btn" onClick={handleCameraClick}>📷 Use Camera</button>
            </div>
          </div>
          <button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Receipt"}
          </button>
        </div>

        {/* Analysis Results */}
        <div className="result-box">
          <h2>Analysis Results</h2>
          <div className="analysis-placeholder">
            <div className="analysis-icon">🔄</div>
            <p>{isLoading ? "Processing..." : (response || "No data to display yet")}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
