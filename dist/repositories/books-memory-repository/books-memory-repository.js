"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRepository = void 0;
const books_memory_repository_variables_1 = require("./books-memory-repository.variables");
const booksRepository = {
    getBooks() {
        return books_memory_repository_variables_1.db.books;
    },
    findBook(id) {
        const book = books_memory_repository_variables_1.db.books.find((book) => book.id === id);
        return book;
    },
    createBook({ title }) {
        var _a;
        const newBook = {
            id: `${Number((_a = books_memory_repository_variables_1.db.books.at(-1)) === null || _a === void 0 ? void 0 : _a.id) + 1}`,
            title,
            img: {
                alt: title,
                src: '',
            },
            price: '22 USD',
            description: title,
            rating: 5,
        };
        books_memory_repository_variables_1.db.books.push(newBook);
        return books_memory_repository_variables_1.db.books;
    },
    deleteBook(id) {
        const indexId = books_memory_repository_variables_1.db.books.findIndex((book) => book.id === id);
        if (indexId !== -1) {
            books_memory_repository_variables_1.db.books.splice(indexId, 1);
            return true;
        }
        return false;
    },
    updateBooks({ id, title }) {
        const foundBook = books_memory_repository_variables_1.db.books.find((book) => book.id === id);
        if (foundBook) {
            foundBook.title = title;
            return true;
        }
        return false;
    },
};
exports.booksRepository = booksRepository;
