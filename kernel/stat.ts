import { defineStore } from 'pinia';
import { useBookStore } from './book';

export const defaultStat = { count: 0, readingTime: 0, category: [] };

export const useStatStore = defineStore('stat', () => {
  const bookStore = useBookStore();

  // { year: { count, readingTime, category: [{ value: '', name: '', children: [{ value: '', name: '' }] }] } }
  const stat = computed(() => {
    const books = bookStore.books;
    const target = books.reduce(
      (acc, book) => {
        if (!book.finishTime) {
          return acc;
        }

        const { finishTime, readingTime, categoryTitle, subCategoryTitle } = book;
        acc[0].count++;
        acc[0].readingTime += readingTime;
        acc[0].category[categoryTitle] = acc[0].category[categoryTitle] || {
          value: 0,
          children: {},
        };
        acc[0].category[categoryTitle].value++;

        acc[0].category[categoryTitle].children[subCategoryTitle] = acc[0].category[categoryTitle]
          .children[subCategoryTitle] || {
          value: 0,
        };
        acc[0].category[categoryTitle].children[subCategoryTitle].value++;

        const year = new Date(finishTime).getFullYear();
        if (!acc[year]) {
          acc[year] = {
            count: 0,
            readingTime: 0,
            category: {},
          };
        }
        acc[year].count++;
        acc[year].readingTime += readingTime;

        acc[year].category[categoryTitle] = acc[year].category[categoryTitle] || {
          value: 0,
          children: {},
        };
        acc[year].category[categoryTitle].value++;

        acc[year].category[categoryTitle].children[subCategoryTitle] = acc[year].category[
          categoryTitle
        ].children[subCategoryTitle] || {
          value: 0,
        };
        acc[year].category[categoryTitle].children[subCategoryTitle].value++;
        return acc;
      },
      { 0: Object.assign({}, defaultStat, { category: {} }) } as any,
    );

    // 将 target 中的所有对象的 category 转为数组
    Object.keys(target).forEach((key) => {
      const categorys = target[key].category;
      target[key].category = Object.keys(categorys).map((category) => {
        return {
          value: categorys[category].value,
          name: category,
          children: Object.keys(categorys[category].children).map((subCategory) => {
            return {
              value: target[key].category[category].children[subCategory].value,
              name: subCategory,
            };
          }),
        };
      });
    });

    return target;
  });

  return { stat };
});

export const useYearStore = defineStore('year', () => {
  const current = ref(new Date().getFullYear());

  const toNextYear = () => {
    if (current.value === 0) {
      current.value = new Date().getFullYear() + 1;
      return;
    }
    current.value++;
  };

  const toPrevYear = () => {
    if (current.value === 0) {
      current.value = new Date().getFullYear() - 1;
      return;
    }
    current.value--;
  };

  const toThisYear = () => {
    current.value = new Date().getFullYear();
  };

  const toAll = () => {
    current.value = 0;
  };

  return { current, toNextYear, toPrevYear, toThisYear, toAll };
});
