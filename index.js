import express from 'express';
import { mainRouter } from './routes/router.js';

const app = express();

app.use(mainRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
