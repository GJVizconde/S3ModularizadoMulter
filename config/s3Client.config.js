import { S3Client } from '@aws-sdk/client-s3';

import {
  AWS_ACCESS_KEY_ID,
  AWS_DEFAULT_REGION,
  AWS_SECRET_ACCESS_KEY,
} from '../config.js';

export const s3Client = new S3Client({
  region: AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});
