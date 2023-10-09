import { uploadFileS3 } from '../s3.js';

export const uploadFile = async (req, res) => {
  await uploadFileS3(req.file);
  res.status(200).json('Success');
};
