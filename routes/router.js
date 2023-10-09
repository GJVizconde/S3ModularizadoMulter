import { Router } from 'express';
import { upload, uploadMultiple } from '../config/multer.config.js';
import { uploadFile, uploadFiles } from '../controller/s3.controller.js';

export const mainRouter = Router();

mainRouter.post('/uploadSingle', upload.single('file'), uploadFile);

mainRouter.post(
  '/uploadMultiple/:folder/:userId',
  uploadMultiple.array('files'),
  uploadFiles
);
