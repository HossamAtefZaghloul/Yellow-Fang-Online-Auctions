// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';

// Configure multer to store files temporarily
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads/',  // Temporarily store files here
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

// Middleware for handling the upload
const uploadMiddleware = upload.single('image');

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// Use the upload middleware
apiRoute.use(uploadMiddleware);

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // The uploaded file details are in req.file
    const filePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({ message: 'Upload successful', filePath });
});

export default apiRoute;

// Disable Next.js body parser for multer to handle form-data
export const config = {
    api: {
        bodyParser: false,
    },
};
