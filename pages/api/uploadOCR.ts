import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFileWithOCR } from '@/lib/actions/file.actions';  // Import the function to handle file upload and OCR

// API handler for file upload and OCR processing
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const file = req.body.file;  // Extract the file from the request body

      // Define your Appwrite bucket and database IDs here
      const bucketId = '6734aa900012411da858';  // Replace with your Appwrite bucket ID
      const databaseId = '6734a7e5002745ab8d59';  // Replace with your Appwrite database ID
      const ocrCollectionId = '6749ac0b002ad7cbbf32';  // Replace with your OCR collection ID in Appwrite

      // Call the function to upload file and store OCR data
      const result = await uploadFileWithOCR(bucketId, file, databaseId, ocrCollectionId);

      return res.status(200).json({ success: true, data: result });  // Return success response
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });  // Handle errors
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });  // If not POST, return 405
  }
}
