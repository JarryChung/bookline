<script setup>
import {
  TextAnnotationToggle,
  Time,
  ArrowRight,
  CheckboxCheckedFilled,
  ProgressBarRound,
  Review,
} from '@vicons/carbon';
import { NPopover } from 'naive-ui';
import { useBookStore } from '@/kernel/book';
import { useSelectionStore } from '@/kernel/note';
import { formatTime, formatReadingTime } from '@/kernel/helper';

const book = useBookStore();

const selection = useSelectionStore();
const isSelected = (id) => {
  return selection.selected.includes(id);
};
const updateSelected = (id) => {
  selection.updateSelected(id);
};
</script>

<template>
  <div class="wrapper">
    <div
      v-for="book in book.books"
      :key="book.bookId"
      :class="['card', { 'select-mode': selection.isSelecting }]"
      @click="updateSelected(book.bookId)"
    >
      <img :src="book.cover" alt="cover" class="cover" />

      <div class="book">
        <NPopover placement="bottom-start" :delay="1000">
          <template #trigger>
            <div class="book-title">{{ book.title }}</div>
          </template>
          <span>{{ book.title }}</span>
        </NPopover>

        <div class="book-info">[作] {{ book.author }}</div>
        <div class="book-info" v-if="book.translator">[译] {{ book.translator }}</div>

        <div class="book-info split gap">
          <span>
            <TextAnnotationToggle class="icon" />
            {{ book.noteCount }}
          </span>
          <span>
            <Review class="icon" />
            {{ book.reviewCount }}
          </span>
        </div>
        <div class="book-info">
          <span>
            <Time class="icon" />
            {{ formatReadingTime(book.readingTime) }}
          </span>
        </div>

        <div class="book-info split">
          <span>
            <ProgressBarRound class="icon" />
            {{ formatTime(book.startReadingTime) }}
            <ArrowRight class="icon" style="padding: 0 6px 0 3px" />
          </span>
          <span v-if="book.finishTime">{{ formatTime(book.finishTime) }}</span>
          <span v-else>{{ book.progress }}%</span>
        </div>
      </div>

      <div class="select" v-if="selection.isSelecting">
        <CheckboxCheckedFilled
          :class="['select-icon', { 'is-selected': isSelected(book.bookId) }]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.card {
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: 50%;
  margin-bottom: 16px;
}
.select-mode {
  cursor: pointer;
  user-select: none;
}
.cover {
  width: 90px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}
.book {
  width: 210px;
  padding: 0 16px 0 8px;
}
.book-title {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.book-info {
  display: flex;
  font-size: 12px;
}
.gap {
  gap: 16px;
}
.icon {
  width: 14px;
  vertical-align: text-bottom;
}
.split {
  margin-top: 8px;
}
.select {
  position: absolute;
  bottom: 0;
  right: 16px;
}
.select-icon {
  width: 18px;
  vertical-align: text-bottom;
  color: #aaa;
}
.is-selected {
  color: #111;
}
</style>
