import { Router } from 'express';
import { upload, uploadMultiple } from '../utils/multer.utils.js';
import { uploadFileMultiple } from '../s3.js';
import { uploadFile } from '../controller/s3.controller.js';

export const mainRouter = Router();

mainRouter.post('/uploadSingle', upload.single('file'), uploadFile);

mainRouter.post(
  '/uploadMultiple',
  uploadMultiple.array('files'),
  async (req, res) => {
    console.log('ARCHIVOS MULTER', req.files);

    await uploadFileMultiple(req.files);

    res.status(200).json('Success');
  }
);
