"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./mocks/db");
const app = (0, express_1.default)();
const port = 3000;
var HTTP_STATUSES;
(function (HTTP_STATUSES) {
    HTTP_STATUSES[HTTP_STATUSES["OK_200"] = 200] = "OK_200";
    HTTP_STATUSES[HTTP_STATUSES["CREATED_201"] = 201] = "CREATED_201";
    HTTP_STATUSES[HTTP_STATUSES["NO_CONTENT_204"] = 204] = "NO_CONTENT_204";
    HTTP_STATUSES[HTTP_STATUSES["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_STATUSES[HTTP_STATUSES["BAD_REQUEST_400"] = 400] = "BAD_REQUEST_400";
})(HTTP_STATUSES || (HTTP_STATUSES = {}));
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
app.use((0, cors_1.default)({ origin: 'http://localhost:3001' }));
app.get('/books', (req, res) => {
    res.json(db_1.db.books);
});
app.get('/books/:id', (req, res) => {
    const book = db_1.db.books.find((book) => book.id === req.params.id);
    if (!book) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
    }
    else {
        res.json(book);
    }
});
app.post('/books', (req, res) => {
    var _a;
    if (req.body.title) {
        db_1.db.books.push({
            id: `${Number((_a = db_1.db.books.at(-1)) === null || _a === void 0 ? void 0 : _a.id) + 1}`,
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
    }
    else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
});
app.delete('/books', (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
    else {
        const indexId = db_1.db.books.findIndex((book) => book.id === id);
        if (indexId > -1) {
            db_1.db.books.splice(indexId, 1);
            res.sendStatus(HTTP_STATUSES.OK_200);
        }
        else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        }
    }
});
app.put('/books/:id', (req, res) => {
    const foundBook = db_1.db.books.find((book) => book.id === req.params.id);
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
