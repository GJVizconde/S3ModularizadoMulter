import formatName from '../utils/formatName.utils.js';
import { uploadFileS3, uploadMultipleFilesS3 } from '../utils/s3utils.js';

export const uploadFile = async (req, res) => {
  try {
    const { file } = req;

    file.originalname = formatName(file.originalname);

    const result = await uploadFileS3(file);
    res.status(200).json({
      status: 'Success',
      url: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadFiles = async (req, res) => {
  const { files } = req;
  const { folder, userId } = req.params;

  try {
    const filesFormatted = files.map((file) => {
      return {
        ...file,
        originalname: formatName(file.originalname),
      };
    });

    const urlFiles = await uploadMultipleFilesS3(
      filesFormatted,
      folder,
      userId
    );

    res.status(200).json({
      status: 'Success',
      urlFiles: urlFiles,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
