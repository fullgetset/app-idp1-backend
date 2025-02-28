"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const enums_1 = require("../../enums");
const repositories_1 = require("../../repositories");
const getBooksRouter = () => {
    const booksRouter = express_1.default.Router();
    booksRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const books = yield repositories_1.booksRepository.getBooks();
        res.json(books);
    }));
    booksRouter.get('/:id([0-9]+)', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const book = yield repositories_1.booksRepository.findBook(id);
        if (!book) {
            res.sendStatus(enums_1.HTTP_STATUSES.NOT_FOUND);
        }
        else {
            res.json(book);
        }
    }));
    booksRouter.post('/', (0, express_validator_1.body)('title').isLength({ min: 3, max: 40 }), (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res
                .status(enums_1.HTTP_STATUSES.BAD_REQUEST_400)
                .json({ errors: errors.array() });
            return;
        }
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
