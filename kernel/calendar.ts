import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', () => {
  const calendarRef = ref<any>(null);

  const date = computed(() => {
    const monthTs = calendarRef.value?.monthTs;
    const ts = new Date(monthTs);
    const year = ts.getFullYear();
    const month = ts.getMonth() + 1;
    return { year, month };
  });

  const setCalendarRef = (r: any) => {
    calendarRef.value = r;
  };

  const toNextMonth = () => {
    if (calendarRef.value) {
      calendarRef.value.handleNextClick();
    }
  };
  const toPrevMonth = () => {
    if (calendarRef.value) {
      calendarRef.value.handlePrevClick();
    }
  };
  const toToday = () => {
    if (calendarRef.value) {
      calendarRef.value.handleTodayClick();
    }
  };

  return { date, setCalendarRef, toNextMonth, toPrevMonth, toToday };
});
