import React, { useState } from 'react';
import axios from 'axios';

function VirusTotalUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const apiKey = 'e536bd3a33bfed7318472055dba9a2fb56c1ddda3708f0ad2d3140c00157618f';

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post('https://www.virustotal.com/api/v3/files', formData, {
        headers: {
          'x-apikey': apiKey,
        },
      })
      .then((response) => {
        const analysisLink = response.data.data.links.self;
        setAnalysisLink(analysisLink);
        setError(null);
        setResult(null);
      })
      .catch((error) => {
        setError('An error occurred while uploading and scanning the file.');
        setAnalysisLink(null);
        setResult(null);
      });
  };

  const fetchAnalysisResult = () => {
    if (!analysisLink) {
      setError('Analysis link is not available.');
      return;
    }

    const apiKey = 'e536bd3a33bfed7318472055dba9a2fb56c1ddda3708f0ad2d3140c00157618f';

    axios
      .get(analysisLink, {
        headers: {
          'x-apikey': apiKey,
        },
      })
      .then((response) => {
        setResult(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('An error occurred while fetching the analysis result.');
      });
  };

  return (
    <div>
      <h2>VirusTotal File Uploader</h2>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleSubmit}>Upload & Scan</button>
      <button onClick={fetchAnalysisResult}>Fetch Analysis Result</button>
      {error && <div className="error">{error}</div>}
      {result && (
        <div>
          <h3>Scan Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default VirusTotalUploader;