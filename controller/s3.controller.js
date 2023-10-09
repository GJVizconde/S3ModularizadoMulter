import { uploadFileS3, uploadMultipleFilesS3 } from '../utils/s3utils.js';

export const uploadFile = async (req, res) => {
  const result = await uploadFileS3(req.file);
  res.status(200).json({
    status: 'Success',
    url: result,
  });
};

export const uploadFiles = async (req, res) => {
  const { files } = req;
  const { folder, userId } = req.params;
  const urlFiles = await uploadMultipleFilesS3(files, folder, userId);

  res.status(200).json({
    status: 'Success',
    urlFiles: urlFiles,
  });
};
