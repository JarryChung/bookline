<script setup>
import { ref } from 'vue';
import { NCalendar, NPopover } from 'naive-ui';
import { useBookStore } from '@/kernel/book';
import { useCalendarStore } from '@/kernel/calendar';

const book = useBookStore();
const cache = {};
const isTargetDate = (timestamp, year, month, date) => {
  const target = new Date(timestamp);
  return (
    year === target.getFullYear() && month === target.getMonth() + 1 && date === target.getDate()
  );
};
const getBook = (year, month, date) => {
  const key = `${year}-${month}-${date}`;
  if (cache[key]) {
    return cache[key];
  }
  const found = book.books.find((book) => {
    if (book.finishTime) {
      return isTargetDate(book.finishTime, year, month, date);
    }
    return isTargetDate(book.updateTime, year, month, date);
  });
  if (found) {
    cache[key] = found;
  }
  return found;
};

const calendarRef = ref(null);
const calendar = useCalendarStore();
onMounted(() => {
  calendar.setCalendarRef(calendarRef.value);
});
</script>

<template>
  <div>
    <NCalendar #="{ year: y, month: m, date: d }" ref="calendarRef">
      <div v-if="getBook(y, m, d)" class="book">
        <div :style="{ backgroundImage: `url(${getBook(y, m, d)?.cover})` }" class="cover-bg"></div>
        <span class="indicator indicator-position" v-if="!getBook(y, m, d).finishTime"></span>
        <NPopover placement="right" width="200px">
          <template #trigger>
            <img :src="getBook(y, m, d)?.cover" alt="cover" class="cover" />
          </template>
          <div>
            <div class="book-title">{{ getBook(y, m, d).title }}</div>
            <div class="book-info">[作] {{ getBook(y, m, d).author }}</div>
            <div class="book-info" v-if="getBook(y, m, d).translator">
              [译] {{ getBook(y, m, d).translator }}
            </div>
            <div class="book-info gap" v-if="!getBook(y, m, d).finishTime">
              <span class="indicator"></span>
              阅读进度 {{ getBook(y, m, d).progress }}%
            </div>
          </div>
        </NPopover>
      </div>
    </NCalendar>
  </div>
</template>

<style scoped>
.book {
  position: relative;
  display: flex;
  justify-content: center;
}
.indicator {
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: #18a058;
  border: 2px solid #1bdb74;
  border-radius: 50%;
}
.indicator-position {
  position: absolute;
  bottom: 0;
  right: 0;
}
.cover-bg {
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  width: 100%;
  height: 48px;
}
.cover {
  height: 48px;
  position: absolute;
  top: 0;
  z-index: 1;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}
.book-title {
  font-size: 18px;
  margin-bottom: 8px;
}
.book-info {
  font-size: 12px;
}
.gap {
  margin-top: 8px;
}
</style>

<style>
.n-calendar {
  height: 402px;
}
.n-calendar .n-calendar-cell {
  padding: 6px;
}
.n-calendar-date {
  padding-bottom: 0.25em !important;
}
.n-calendar-header,
.n-calendar-cell__bar {
  display: none !important;
}
</style>
