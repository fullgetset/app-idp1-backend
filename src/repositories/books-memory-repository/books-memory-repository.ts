import { Books } from '@types';
import { db } from './books-memory-repository.variables';

const booksRepository = {
  getBooks(): Books[] {
    
    return db.books;
  },

  findBook(id: string): Books | undefined {
    const book = db.books.find((book) => book.id === id);

    return book;
  },

  createBook({ title }: { title: string }): Books[] {
    const newBook = {
      id: `${Number(db.books.at(-1)?.id) + 1}`,
      title,
      img: {
        alt: title,
        src: '',
      },
      price: '22 USD',
      description: title,
      rating: 5,
    };

    db.books.push(newBook);

    return db.books;
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
