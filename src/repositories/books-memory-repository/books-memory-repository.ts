import { Books } from '@types';
// import { db } from './books-memory-repository.variables';
import { client } from '../books-repository';

const collectionBooks = client.db('books').collection<Books>('books');

const booksRepository = {
  async getBooks(): Promise<Books[]> {
    return collectionBooks.find().toArray();
  },

  async findBook(id: string): Promise<Books | undefined> {
    const books = await collectionBooks.find().toArray();

    const book = books.find((book) => book.id === id);

    return book;
  },

  async createBook({ title }: { title: string }): Promise<Books[]> {
    const books = await collectionBooks.find().toArray();

    const newBook = {
      id: `${Number(books.at(-1)?.id) + 1}`,
      title,
      img: {
        alt: title,
        src: '',
      },
      price: '22 USD',
      description: title,
      rating: 5,
    };

    await collectionBooks.insertOne(newBook);
    // db.books.push(newBook);

    return books;
  },

  deleteBook(id: string): boolean {
    const indexId = db.books.findIndex((book) => book.id === id);

    if (indexId !== -1) {
      db.books.splice(indexId, 1);
      return true;
    }
    return false;
  },

  updateBooks({ id, title }: { id: string; title: string }): boolean {
    const foundBook = db.books.find((book) => book.id === id);

    if (foundBook) {
      foundBook.title = title;
      return true;
    }
    return false;
  },
};

export { booksRepository };
