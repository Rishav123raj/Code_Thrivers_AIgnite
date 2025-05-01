import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreview(fileURL);
    }
  };

  const handleCameraClick = () => {
    alert("Camera functionality not yet implemented.");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('receipt', file);

    try {
      const res = await axios.post('/api/ocr/scan', formData);
      setResponse(res.data?.formattedResponse || 'No response');
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponse('Failed to upload or process receipt');
    } finally {
      setIsLoading(false);
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

          {/* Dropzone */}
          <div className="dropzone">
            {!preview ? (
              <>
                <div className="upload-icon">📤</div>
                <p>Drag and drop your receipt or<br />PNG, JPG or PDF up to 10MB</p>
              </>
            ) : (
              <div className="receipt-preview">
                {file?.type === 'application/pdf' ? (
                  <iframe src={preview} width="100%" height="400px" title="PDF Preview" />
                ) : (
                  <img src={preview} alt="Receipt preview" className="receipt-image" />
                )}
              </div>
            )}

            <div className="button-group">
              <label className="upload-btn">
                <span>📁 Select File</span>
                <input type="file" accept="image/*,.pdf" onChange={handleFileChange} hidden />
              </label>
              <button className="camera-btn" onClick={handleCameraClick} disabled>
                📷 Use Camera
              </button>
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
