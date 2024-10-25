<script setup>
import { CheckboxCheckedFilled } from '@vicons/carbon';
import { useBookStore } from '@/kernel/book';
import { useSelectionStore } from '@/kernel/note';
import BookCard from './book-card.vue';

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
      <BookCard :book="book" />

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
