import multer from 'multer';

export const upload = multer({ dest: 'uploads/' });

export const storage = multer.memoryStorage();

export const uploadMultiple = multer({ storage });
