import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { useBookStore } from './book';
import { createPool, formatTime, unique } from './helper';
import { downloadZIP } from './export';
import { suffixMap, render } from './template';

export const useNoteStore = defineStore('note', () => {
  const noteData = ref<Record<string, any>>({});

  const user = useUserStore();
  const book = useBookStore();
  const selection = useSelectionStore();

  const fetchNote = createPool(
    (bookId: string, vid: number): Promise<any> => {
      const bookmarkListURL = `https://i.weread.qq.com/book/bookmarklist?bookId=${bookId}`;
      const reviewListURL = `https://i.weread.qq.com/review/list?bookId=${bookId}&mine=1&listType=11&maxIdx=0&count=0&listMode=2&synckey=0&userVid=${vid}`;
      return Promise.all(
        [bookmarkListURL, reviewListURL].map((url) => fetch(url).then((res) => res.json())),
      ).then(([bookmarkList, reviewList]) => {
        const { book, chapters, updated: bookmarks } = bookmarkList;
        const { reviews } = reviewList;
        return { book, chapters, bookmarks, reviews };
      });
    },
    { concurrency: 10 },
  );

  const batchFetchNote = (bookIds: string[]) => {
    const vid = user.info.userVid;
    const promises = [];
    for (const bookId of bookIds) {
      if (!noteData.value[bookId]) {
        const promise = fetchNote(bookId, vid).then((res) => {
          noteData.value[bookId] = res;
        });
        promises.push(promise);
      }
    }
    return Promise.all(promises);
  };

  const getAllChapters = (chapters: any[], reviews: any[], bookFormat: string) => {
    const all = chapters
      .map((chapter) => {
        const { chapterUid, title, chapterIdx } = chapter;
        return { chapterUid, chapterTitle: title, chapterIdx };
      })
      .concat(
        reviews
          .map((review) => {
            if (review.review.type === 1) {
              const { chapterUid, chapterTitle, chapterIdx } = review.review;
              return { chapterUid, chapterTitle, chapterIdx };
            }
            return undefined;
          })
          .filter(
            (item): item is { chapterUid: string; chapterTitle: string; chapterIdx: string } =>
              item !== undefined,
          ),
      );
    const sorted = unique(all, (o) => o.chapterUid).sort((a, b) => a.chapterIdx - b.chapterIdx);
    if (bookFormat === 'txt') {
      sorted.forEach((val, key) => {
        val.chapterTitle = val.chapterTitle ? val.chapterTitle : `第 ${key + 1} 章`;
      });
    }
    return sorted;
  };

  const groupBookmarks = (bookmarks: any[]) => {
    return bookmarks.reduce((acc, cur) => {
      if (!acc[cur.chapterUid]) {
        acc[cur.chapterUid] = [];
      }
      acc[cur.chapterUid].push({
        markText: cur.markText,
        markCreateTime: cur.createTime * 1000,
        range: cur.range,
      });
      return acc;
    }, {});
  };

  const groupReviews = (reviews: any[]) => {
    return reviews.reduce((acc, cur) => {
      const review = cur.review;
      if (review.type !== 1) {
        return acc;
      }
      if (!acc[review.chapterUid]) {
        acc[review.chapterUid] = [];
      }
      acc[review.chapterUid].push({
        reviewText: review.content,
        reviewCreateTime: review.createTime * 1000,
        range: review.range,
        reviewAbstract: review.abstract,
      });
      return acc;
    }, {});
  };

  const mergeNotes = (bookmarks: any[], reviews: any[]) => {
    const merged: Record<string, any> = {};
    bookmarks.forEach((bookmark) => {
      const { range } = bookmark;
      merged[range] = bookmark;
    });
    reviews.forEach((review) => {
      const { range } = review;
      if (merged[range]) {
        Object.assign(merged[range], review);
      } else {
        merged[range] = review;
      }
    });
    return Object.values(merged).sort(
      (a, b) => Number(a.range.split('-')[0]) - Number(b.range.split('-')[0]),
    );
  };

  // return { bookId, cover, title, author, translator, reviewCount, noteCount, bookmarkCount, progress, notes: [{ chapterUid, chapterTitle, chapterIdx, notes: [{ reviewText, reviewCreateTime, range, markText, markCreateTime }] }] }
  const getBookNotes = (bookIds: string[]) => {
    return bookIds.map((bookId) => {
      const { book: notebook, chapters, bookmarks, reviews } = noteData.value[bookId];

      // 格式化 ->
      // 章节：{ chapterUid, chapterTitle, chapterIdx }[]
      // 划线：{ chapterUid: [{ markText, markCreateTime, range }] }
      // 想法：{ chapterUid: [{ reviewText, reviewCreateTime, range, reviewAbstract }] }
      const allChapters = getAllChapters(chapters, reviews, notebook.format);
      const groupedBookmarks = groupBookmarks(bookmarks);
      const groupedReviews = groupReviews(reviews);

      // 以章节顺序遍历，将划线和想法添加到对应章节 ->
      const notes = allChapters.map((chapter: any) => {
        const { chapterUid } = chapter;
        const bookmarks = groupedBookmarks[chapterUid] || [];
        const reviews = groupedReviews[chapterUid] || [];
        return {
          ...chapter,
          notes: mergeNotes(bookmarks, reviews),
        };
      });

      const targetBook = book.books.find((book: any) => book.bookId === bookId);
      return {
        ...targetBook,
        notes,
      };
    });
  };

  const download = async (format: string) => {
    const bookIds = selection.selected;
    if (bookIds.length === 0) {
      return;
    }

    await batchFetchNote(bookIds);
    const fileContents: { [fileName: string]: string } = {};
    const suffix = suffixMap[format];
    const bookNotes = getBookNotes(bookIds);
    bookNotes.forEach((bookNote) => {
      const { title } = bookNote;
      fileContents[`${title}.${suffix}`] = render(bookNote, format);
    });
    downloadZIP(fileContents, `bookline_export_${format}_${formatTime(Date.now())}.zip`);
  };

  const fetchNotes = async (bookIds: string[]) => {
    if (bookIds.length === 0) {
      return;
    }

    await batchFetchNote(bookIds);
    const bookNotes = getBookNotes(bookIds);
    return bookNotes;
  };

  return { download, fetchNotes };
});

export const useSelectionStore = defineStore('selection', () => {
  const isSelecting = ref(false);
  const selected = ref<string[]>([]);

  const setIsSelecting = (is: boolean) => {
    isSelecting.value = is;
  };

  const setSelected = (list: string[]) => {
    selected.value = [...list];
  };

  const updateSelected = (id: string) => {
    const index = selected.value.indexOf(id);
    if (index < 0) {
      selected.value.push(id);
    } else {
      selected.value.splice(index, 1);
    }
  };

  return { isSelecting, selected, setIsSelecting, setSelected, updateSelected };
});
