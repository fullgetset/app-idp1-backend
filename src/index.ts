import express, { Request, Response } from 'express';
import cors from 'cors';

import { db } from './mocks/db';
import { HTTP_STATUSES } from '@enums';
import { Books } from '@types';

const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/books', (req: Request, res: Response<Books[]>) => {
  res.json(db.books);
});
app.get('/books/:id', (req: Request<{ id: string }>, res: Response<Books>) => {
  const { id } = req.params;
  const book = db.books.find((book) => book.id === id);

  if (!book) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND);
  } else {
    res.json(book);
  }
});
app.post('/books', (req: Request<{}, {}, { title: string }>, res) => {
  const { title } = req.body;

  if (title) {
    db.books.push({
      id: `${Number(db.books.at(-1)?.id) + 1}`,
      title,
      img: {
        alt: title,
        src: '',
      },
      price: '22 USD',
      description: title,
      rating: 5,
    });

    res.sendStatus(HTTP_STATUSES.CREATED_201);
  } else {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});
app.delete('/books', (req: Request<{}, {}, {}, { id: string }>, res) => {
  const { id } = req.query;

  if (!id) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  } else {
    const indexId = db.books.findIndex((book) => book.id === id);

    if (indexId > -1) {
      db.books.splice(indexId, 1);
      res.sendStatus(HTTP_STATUSES.OK_200);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND);
    }
  }
});
app.put('/books/:id', (req, res) => {
  const foundBook = db.books.find((book) => book.id === req.params.id);

  if (!req.body.title) {
    res.sendStatus(400);
    return;
  }

  if (!foundBook) {
    res.sendStatus(404);
    return;
  }

  foundBook.title = req.body.title;
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
