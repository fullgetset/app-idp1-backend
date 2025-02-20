import express from 'express';
import cors from 'cors';

import { db } from './mocks/db';

const app = express();
const port = 3000;

enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,

  NOT_FOUND = 404,
  BAD_REQUEST_400 = 400
}

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/books', (req, res) => {
  res.json(db.books);
});
app.get('/books/:id', (req, res) => {
  const book = db.books.find((book) => book.id === req.params.id);

  if (!book) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND);
  } else {
    res.json(book);
  }
});
app.post('/books', (req, res) => {
  if (req.body.title) {
    db.books.push({
      id: `${Number(db.books.at(-1)?.id) + 1}`,
      title: req.body.title,
      img: {
        alt: req.body.title,
        src: '',
      },
      price: '22 USD',
      description: req.body.title,
      rating: 5,
    });

    res.sendStatus(HTTP_STATUSES.CREATED_201);
  } else {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }
});
app.delete('/books', (req, res) => {
  const id = req.query.id;

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
