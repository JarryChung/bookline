<script setup>
import { useRandomNoteStore } from '@/kernel/review';
import BookCard from './book-card.vue';

const randomNoteStore = useRandomNoteStore();
</script>

<template>
  <div class="review-container">
    <BookCard :book="randomNoteStore.randomBook" class="card" />
    <div v-for="note of randomNoteStore.randomNotes" :key="note.text" class="card">
      <div class="text">{{ note.text }}</div>
      <div v-if="note.review" class="review">[评] {{ note.review }}</div>
    </div>
  </div>
</template>

<style scoped>
.review-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card {
  width: calc(50% - 4px);
  box-sizing: border-box;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
}
.text {
  line-height: 1.5;
  padding-bottom: 2px;
}
.review {
  border-top: 1px solid #f3f3f3;
  line-height: 1.5;
  color: #666;
  padding-top: 2px;
}
</style>
