import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import cors from 'cors';
import routes from './routes';
import { AppError } from './errors/AppError';

import './database';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerFile = require('../doc/swagger/doc.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log(`Service started on port 3333!`);
});
