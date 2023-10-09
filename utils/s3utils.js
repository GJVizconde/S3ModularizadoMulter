import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { AWS_BUCKET_NAME } from '../config.js';
import { s3Client } from '../config/s3Client.config.js';

export async function uploadFileS3(file) {
  const stream = fs.createReadStream(file.path);

  try {
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: `uploadsss/${file.originalname}`,
      Body: stream,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;
  } catch (error) {
    throw new Error(error);
  }
}

export async function uploadMultipleFilesS3(files, folder, userId) {
  console.log(files);
  const uploadParams = files.map((file) => {
    return {
      Bucket: AWS_BUCKET_NAME,
      Key: `${folder}/${userId}/${file.originalname}`,
      Body: file.buffer,
    };
  });

  try {
    const result = await Promise.all(
      uploadParams.map((param) => s3Client.send(new PutObjectCommand(param)))
    );

    if (result[0].$metadata.httpStatusCode === 200) {
      const urlFiles = uploadParams.map(
        (param) => `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${param.Key}`
      );
      return urlFiles;
    }
  } catch (error) {
    throw new Error(error);
  }
}
