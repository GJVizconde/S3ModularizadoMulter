import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_DEFAULT_REGION,
  AWS_SECRET_ACCESS_KEY,
} from './config.js';

import fs from 'fs';

const s3Client = new S3Client({
  region: AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileS3(file) {
  const stream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `uploadsss/${file.originalname}`,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  const result = await s3Client.send(command);

  console.log(result);
}

export async function uploadFileMultiple(files) {
  const uploadParams = files.map((file) => {
    return {
      Bucket: AWS_BUCKET_NAME,
      Key: `uploadsss/${file.originalname}`,
      Body: file.buffer,
    };
  });

  const result = await Promise.all(
    uploadParams.map((param) => s3Client.send(new PutObjectCommand(param)))
  );

  console.log(result);
}
