import { useState } from 'react';
import axios from 'axios';

const DownloadPDFButton = ({ userId }: { userId: string }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGenerateAndUpload = async () => {
    try {
      const response = await axios.get(`/api/downloadPdf/${userId}`);
      if (response?.data?.pdfUrl) {
        setPdfUrl(response.data.pdfUrl);
        // Optionally, trigger download automatically
        window.open(response.data.pdfUrl, '_blank');
      }
    } catch (error) {
      console.error('Error generating or uploading PDF', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateAndUpload}>Generate and Upload PDF</button>
      {pdfUrl && (
        <div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
        </div>
      )}
    </div>
  );
};

export default DownloadPDFButton;
