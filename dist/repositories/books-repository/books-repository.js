"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRepository = void 0;
const db_1 = require("../../mocks/db");
const booksRepository = {
    getBooks() {
        return db_1.db.books;
    },
    findBook(id) {
        const book = db_1.db.books.find((book) => book.id === id);
        return book;
    },
    createBook({ title }) {
        var _a;
        const newBook = {
            id: `${Number((_a = db_1.db.books.at(-1)) === null || _a === void 0 ? void 0 : _a.id) + 1}`,
            title,
            img: {
                alt: title,
                src: '',
            },
            price: '22 USD',
            description: title,
            rating: 5,
        };
        db_1.db.books.push(newBook);
        return db_1.db.books;
    },
    deleteBook(id) {
        const indexId = db_1.db.books.findIndex((book) => book.id === id);
        if (indexId !== -1) {
            db_1.db.books.splice(indexId, 1);
            return true;
        }
        return false;
    },
    updateBooks({ id, title }) {
        const foundBook = db_1.db.books.find((book) => book.id === id);
        if (foundBook) {
            foundBook.title = title;
            return true;
        }
        return false;
    },
};
exports.booksRepository = booksRepository;
