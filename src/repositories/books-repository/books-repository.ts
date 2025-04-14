import { Books } from '@types';
import { client } from '../run-base';

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

    return books;
  },

  async deleteBook(id: string): Promise<boolean> {
    const result = await collectionBooks.deleteOne({ id });

    return result.deletedCount >= 1;
  },

  async updateBooks({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): Promise<boolean> {
    const result = await collectionBooks.updateOne({ id }, { $set: { title } });

    return result.modifiedCount >= 1;
  },
};

export { booksRepository };
