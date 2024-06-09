import { Request, Response, NextFunction } from 'express';
import { storage } from '../config/firebaseConfig';
import { format } from 'util';
import Multer from 'multer';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

export const upload = multer.single('file');

export const uploadPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const bucket = storage.bucket();
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err: Error) => {
    next(err);
  });

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    (req as any).file.publicUrl = publicUrl;
    next();
  });

  blobStream.end(req.file.buffer);
};
