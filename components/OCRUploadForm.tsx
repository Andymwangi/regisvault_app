import { useState } from 'react';

const OCRUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      setIsLoading(true);

      // Create FormData to send the file
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/uploadOCR', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          setOcrResult(result.data.ocrText);  // Display OCR text
        } else {
          console.error('OCR failed:', result.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload for OCR'}
      </button>
      {ocrResult && (
        <div>
          <h3>OCR Result:</h3>
          <pre>{ocrResult}</pre>
        </div>
      )}
    </div>
  );
};

export default OCRUploadForm;
