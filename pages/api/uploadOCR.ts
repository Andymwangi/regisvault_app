import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFileWithOCR } from '@/lib/actions/file.actions'; 
import { Client } from 'node-appwrite'; // Import the function to handle file upload and OCR

// API handler for file upload and OCR processing
const client = new Client()

  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ocrCollectionId = process.env.NEXT_PUBLIC_APPWRITE_OCR_COLLECTION_ID!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const file = req.body.file; // Assumes file is sent in the request body

      // Call the function with all required arguments
      const document = await uploadFileWithOCR(client, bucketId, file, databaseId, ocrCollectionId);

      res.status(200).json({ message: "File uploaded successfully", document });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
