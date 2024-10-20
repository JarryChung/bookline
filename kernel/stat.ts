import { defineStore } from 'pinia';
import { useBookStore } from './book';

export const defaultStat = { count: 0, readingTime: 0, category: [] };

export const useStatStore = defineStore('stat', () => {
  const bookStore = useBookStore();

  // { year: { count, readingTime, category: [{ value: '', name: '', children: [{ value: '', name: '' }] }] } }
  const stat = computed(() => {
    const books = bookStore.books;

    const updateCategoryStats = (
      acc: any,
      key: number | string,
      categoryTitle: string,
      subCategoryTitle: string,
      readingTime: number,
    ) => {
      acc[key].count++;
      acc[key].readingTime += readingTime;

      acc[key].category[categoryTitle] = acc[key].category[categoryTitle] || {
        value: 0,
        children: {},
      };
      acc[key].category[categoryTitle].value++;

      acc[key].category[categoryTitle].children[subCategoryTitle] = acc[key].category[categoryTitle]
        .children[subCategoryTitle] || { value: 0 };
      acc[key].category[categoryTitle].children[subCategoryTitle].value++;
    };

    const target = books.reduce(
      (acc, book) => {
        if (!book.finishTime) return acc;

        const { finishTime, readingTime, categoryTitle, subCategoryTitle } = book;

        // 更新总计
        updateCategoryStats(acc, 0, categoryTitle, subCategoryTitle, readingTime);

        // 更新按年份的统计
        const year = new Date(finishTime).getFullYear();
        if (!acc[year]) {
          acc[year] = {
            count: 0,
            readingTime: 0,
            category: {},
          };
        }
        updateCategoryStats(acc, year, categoryTitle, subCategoryTitle, readingTime);

        return acc;
      },
      { 0: { ...defaultStat, category: {} } } as any,
    );

    // 将 target 中的所有对象的 category 转为数组
    Object.keys(target).forEach((key) => {
      const categories = target[key].category;
      target[key].category = Object.keys(categories).map((category) => ({
        value: categories[category].value,
        name: category,
        children: Object.keys(categories[category].children).map((subCategory) => ({
          value: categories[category].children[subCategory].value,
          name: subCategory,
        })),
      }));
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
