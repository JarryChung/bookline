import { defineStore } from 'pinia';
import { useAsyncResource } from './helper';
import { useBookStore } from './book';
import { useNoteStore } from './note';

export const useRandomNoteStore = defineStore('randomNote', () => {
  const book = useBookStore();
  const note = useNoteStore();

  const randomBook = ref<any>({});
  const randomNotes = ref<any[]>([]);

  const getRamdomNotes = async () => {
    const books = book.books;
    const targetIndex = Math.floor(Math.random() * books.length);
    const targetBook = books[targetIndex];
    randomBook.value = targetBook;

    const targetBookId = targetBook.bookId;
    const noteData = await note.fetchNotes([targetBookId]);
    const chapters = noteData?.[0].notes || [];
    const notes = chapters
      .map((chapter) => {
        const { notes } = chapter;
        return notes.map((note: any) => {
          const { reviewText, reviewAbstract, markText } = note;
          const text = markText || reviewAbstract;
          return { text, review: reviewText };
        });
      })
      .flat();

    if (notes.length < 10) {
      randomNotes.value = notes;
      return;
    }
    const startIndex = Math.floor(Math.random() * (notes.length - 10));
    const endIndex = startIndex + 10;
    const targetNotes = notes.slice(startIndex, endIndex);
    randomNotes.value = targetNotes;
  };

  getRamdomNotes();

  return { getRamdomNotes, randomBook, randomNotes };
});
