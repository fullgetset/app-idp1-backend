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
import { booksRepository, UpdateBooks } from '../../repositories';

const getBooksRouter = () => {
  const booksRouter = express.Router();

  booksRouter.get('/all', async (req: Request, res: Response<Books[]>) => {
    const books = await booksRepository.getBooksAll();

    res.json(books);
  });

  booksRouter.get('/', async (req: Request, res: Response<Books[]>) => {
    const { page } = req.query;
    const books = await booksRepository.getBooks((page as string) || '0');

    setTimeout(() => res.json(books));
  });

  booksRouter.get(
    '/:id([0-9]+)',
    async (req: RequestParams<{ id: string }>, res: Response<Books>) => {
      const { id } = req.params;
      const book = await booksRepository.findBook(id);

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
    (
      req: RequestBody<{ title: string; price: string; description: string }>,
      res
    ) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST_400)
          .json({ errors: errors.array() });
        return;
      }

      if (req.body.title) {
        booksRepository.createBook(req.body);

        res.sendStatus(HTTP_STATUSES.CREATED_201);
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      }
    }
  );

  booksRouter.delete('/', async (req: RequestQuery<{ id: string }>, res) => {
    const { id } = req.query;

    if (!id) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    } else {
      const isDeleted = await booksRepository.deleteBook(id);

      isDeleted
        ? res.sendStatus(HTTP_STATUSES.OK_200)
        : res.sendStatus(HTTP_STATUSES.NOT_FOUND);
    }
  });

  booksRouter.put(
    '/:id([0-9]+)',
    async (
      req: RequestParams<{ id: string }> & RequestBody<UpdateBooks>,
      res
    ) => {
      const { id } = req.params;
      const { title, description, price, img } = req.body;

      if (!title && !description && !price) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const isUpdated = await booksRepository.updateBooks({
        id,
        title,
        description,
        price,
        img,
      });

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
