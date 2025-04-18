import { Books } from '@types';
import { client } from '../run-base';
import { PAGINATION } from '../../enums';
import { UpdateBooks } from './books-repository.types';

const collectionBooks = client.db('books').collection<Books>('books');

const booksRepository = {
  async getBooksAll(): Promise<Books[]> {
    const books = await collectionBooks.find().toArray();

    return books;
  },

  async getBooks(page: string): Promise<Books[]> {
    const books = await collectionBooks.find().toArray();
    const maxPage = Math.floor(books.length / PAGINATION.QUANTITY_ITEMS);
    const currentPage = Math.min(Number(page), maxPage);
    const startIndex = currentPage * PAGINATION.QUANTITY_ITEMS;

    return books.slice(startIndex, startIndex + PAGINATION.QUANTITY_ITEMS);
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
    description,
    img,
    price,
  }: UpdateBooks): Promise<boolean> {
    const updateFields: Omit<UpdateBooks, 'id'> = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (img !== undefined) updateFields.img = img;
    if (price !== undefined) updateFields.price = price;

    const result = await collectionBooks.updateOne(
      { id },
      { $set: { ...updateFields } }
    );

    return result.modifiedCount >= 1;
  },
};

export { booksRepository };
