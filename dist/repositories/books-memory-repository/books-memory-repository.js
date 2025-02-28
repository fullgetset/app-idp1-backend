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
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRepository = void 0;
// import { db } from './books-memory-repository.variables';
const books_repository_1 = require("../books-repository");
const collectionBooks = books_repository_1.client.db('books').collection('books');
const booksRepository = {
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return collectionBooks.find().toArray();
        });
    },
    findBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield collectionBooks.find().toArray();
            const book = books.find((book) => book.id === id);
            return book;
        });
    },
    createBook(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title }) {
            var _b;
            const books = yield collectionBooks.find().toArray();
            const newBook = {
                id: `${Number((_b = books.at(-1)) === null || _b === void 0 ? void 0 : _b.id) + 1}`,
                title,
                img: {
                    alt: title,
                    src: '',
                },
                price: '22 USD',
                description: title,
                rating: 5,
            };
            yield collectionBooks.insertOne(newBook);
            // db.books.push(newBook);
            return books;
        });
    },
    deleteBook(id) {
        const indexId = db.books.findIndex((book) => book.id === id);
        if (indexId !== -1) {
            db.books.splice(indexId, 1);
            return true;
        }
        return false;
    },
    updateBooks({ id, title }) {
        const foundBook = db.books.find((book) => book.id === id);
        if (foundBook) {
            foundBook.title = title;
            return true;
        }
        return false;
    },
};
exports.booksRepository = booksRepository;
