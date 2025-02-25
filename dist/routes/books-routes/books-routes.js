"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksRouter = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../../enums");
const repositories_1 = require("../../repositories");
const getBooksRouter = () => {
    const booksRouter = express_1.default.Router();
    booksRouter.get('/', (req, res) => {
        res.json(repositories_1.booksRepository.getBooks());
    });
    booksRouter.get('/:id([0-9]+)', (req, res) => {
        const { id } = req.params;
        const book = repositories_1.booksRepository.findBook(id);
        if (!book) {
            res.sendStatus(enums_1.HTTP_STATUSES.NOT_FOUND);
        }
        else {
            res.json(book);
        }
    });
    booksRouter.post('/', (req, res) => {
        const { title } = req.body;
        if (title) {
            repositories_1.booksRepository.createBook({ title });
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
            const isDeleted = repositories_1.booksRepository.deleteBook(id);
            isDeleted
                ? res.sendStatus(enums_1.HTTP_STATUSES.OK_200)
                : res.sendStatus(enums_1.HTTP_STATUSES.NOT_FOUND);
        }
    });
    booksRouter.put('/:id([0-9]+)', (req, res) => {
        const { id } = req.params;
        const { title } = req.body;
        if (!title) {
            res.sendStatus(enums_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const isUpdated = repositories_1.booksRepository.updateBooks({ id, title });
        if (isUpdated) {
            res.sendStatus(enums_1.HTTP_STATUSES.CREATED_201);
        }
        else {
            res.sendStatus(enums_1.HTTP_STATUSES.NOT_FOUND);
        }
    });
    return booksRouter;
};
exports.getBooksRouter = getBooksRouter;
