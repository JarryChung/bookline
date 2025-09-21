import { defineStore } from 'pinia';
import { useAsyncResource, createPool, replaceOne } from './helper';

const fetchProgress = createPool(
  (bookId: string): Promise<any> => {
    const url = `https://weread.qq.com/web/book/getProgress?bookId=${bookId}`;
    return fetch(url).then((res) => res.json());
  },
  { concurrency: 15 },
);
const fetchBook = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('https://weread.qq.com/api/user/notebook')
      .then((res) => res.json())
      .then(async (data) => {
        const books = data.books;
        const promises = books.map((book: any) => {
          return fetchProgress(book.bookId).then((res: any) => {
            book['progress'] = res.book;
            return book;
          });
        });
        const updatedBooks = await Promise.all(promises);
        resolve(updatedBooks);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const useBookStore = defineStore('book', () => {
  const noteData = useAsyncResource(() => fetchBook());

  const books = computed(() => {
    const data = noteData.data.value || [];
    return data.map((val: any) => {
      const { book, progress: progressData, noteCount, reviewCount, bookmarkCount } = val;
      const { bookId, title, author, translator, cover, categories } = book;
      const { readingTime, startReadingTime, finishTime, updateTime, progress } = progressData;
      const { categoryId, subCategoryId, title: cTitle = '' } = categories?.[0] || {};
      const [categoryTitle, subCategoryTitle] = cTitle.split('-');

      return {
        bookId,
        title,
        author,
        translator,
        cover: replaceOne(cover, 's_', 't6_'),
        noteCount,
        reviewCount,
        bookmarkCount,
        readingTime,
        startReadingTime: startReadingTime * 1000,
        finishTime: finishTime * 1000,
        updateTime: updateTime * 1000,
        progress,
        categoryId,
        subCategoryId,
        categoryTitle,
        subCategoryTitle,
      };
    });
  });

  const bookIds = computed(() => books.value.map((book) => book.bookId));

  return { books, bookIds };
});
