import express, { Request, Response } from 'express';
import cors from 'cors';
import { getBooksRouter } from './routes';
import { db } from './mocks/db';

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(cors({ origin: 'http://localhost:3001' }));

app.use('/books', getBooksRouter(db));
