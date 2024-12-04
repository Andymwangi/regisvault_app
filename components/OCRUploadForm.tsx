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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Upload Document for OCR</h2>
      
      {/* File Input Section */}
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
          Select a file to upload
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Upload Button */}
      <div className="mb-6">
        <button
          onClick={handleFileUpload}
          disabled={isLoading || !file}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-all duration-200 ${
            isLoading || !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Uploading...' : 'Upload for OCR'}
        </button>
      </div>

      {/* Display OCR Result */}
      {ocrResult && (
        <div className="bg-gray-100 p-4 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-2">OCR Result:</h3>
          <pre className="whitespace-pre-wrap text-gray-700">{ocrResult}</pre>
        </div>
      )}
    </div>
  );
};
export default OCRUploadForm;
