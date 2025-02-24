"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../../enums");
const getBooksRouter = (db) => {
    const booksRouter = express_1.default.Router();
    booksRouter.get('/', (req, res) => {
        res.json(db.books);
    });
    booksRouter.get('/:id', (req, res) => {
        const { id } = req.params;
        const book = db.books.find((book) => book.id === id);
        if (!book) {
            res.sendStatus(enums_1.HTTP_STATUSES.NOT_FOUND);
        }
        else {
            res.json(book);
        }
    });
    booksRouter.post('/', (req, res) => {
        var _a;
        const { title } = req.body;
        if (title) {
            db.books.push({
                id: `${Number((_a = db.books.at(-1)) === null || _a === void 0 ? void 0 : _a.id) + 1}`,
                title,
                img: {
                    alt: title,
                    src: '',
                },
                price: '22 USD',
                description: title,
                rating: 5,
            });
            res.sendStatus(enums_1.HTTP_STATUSES.CREATED_201);
        }
        else {
            res.sendStatus(enums_1.HTTP_STATUSES.BAD_REQUEST_400);
        }
    });
    booksRouter.delete('/', (req, res) => {
        const { id } = req.query;
        if (!id) {
            res.sendStatus(enums_1.HTTP_STATUSES.BAD_REQUEST_400);
        }
        else {
            const indexId = db.books.findIndex((book) => book.id === id);
            if (indexId > -1) {
                db.books.splice(indexId, 1);
                res.sendStatus(enums_1.HTTP_STATUSES.OK_200);
            }
            else {
                res.sendStatus(enums_1.HTTP_STATUSES.NOT_FOUND);
            }
        }
    });
    booksRouter.put('/:id', (req, res) => {
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
    return booksRouter;
};
exports.getBooksRouter = getBooksRouter;
