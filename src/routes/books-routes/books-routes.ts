import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { HTTP_STATUSES } from '../../enums';
import {
  Books,
  DBType,
  RequestBody,
  RequestParams,
  RequestQuery,
} from '@types';
import { booksRepository } from '../../repositories';

const getBooksRouter = () => {
  const booksRouter = express.Router();

  booksRouter.get('/', (req: Request, res: Response<Books[]>) => {
    res.json(booksRepository.getBooks());
  });

  booksRouter.get(
    '/:id([0-9]+)',
    (req: RequestParams<{ id: string }>, res: Response<Books>) => {
      const { id } = req.params;
      const book = booksRepository.findBook(id);

      if (!book) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
      } else {
        res.json(book);
      }
    }
  );

  booksRouter.post(
    '/',
    body('title').isLength({ min: 3, max: 40 }),
    (req: RequestBody<{ title: string }>, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST_400)
          .json({ errors: errors.array() });
        return;
      }

      const { title } = req.body;

      if (title) {
        booksRepository.createBook({ title });

        res.sendStatus(HTTP_STATUSES.CREATED_201);
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      }
    }
  );

  booksRouter.delete('/', (req: RequestQuery<{ id: string }>, res) => {
    const { id } = req.query;

    if (!id) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    } else {
      const isDeleted = booksRepository.deleteBook(id);

      isDeleted
        ? res.sendStatus(HTTP_STATUSES.OK_200)
        : res.sendStatus(HTTP_STATUSES.NOT_FOUND);
    }
  });

  booksRouter.put(
    '/:id([0-9]+)',
    (
      req: RequestParams<{ id: string }> & RequestBody<{ title: string }>,
      res
    ) => {
      const { id } = req.params;
      const { title } = req.body;

      if (!title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const isUpdated = booksRepository.updateBooks({ id, title });

      if (isUpdated) {
        res.sendStatus(HTTP_STATUSES.CREATED_201);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
      }
    }
  );

  return booksRouter;
};

export { getBooksRouter };
