<script setup>
import {
  TextAnnotationToggle,
  Time,
  ArrowRight,
  ProgressBarRound,
  Review,
  MachineLearningModel,
} from '@vicons/carbon';
import { NPopover, NImage } from 'naive-ui';
import { formatReadingTime, formatTime } from '@/kernel/helper';
import ReviewWindow from './review-window.vue';

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const reviewWindowRef = ref(null);
function onOpenReviewWindow(bookId, title, cover) {
  reviewWindowRef.value.open(bookId, title, cover);
}
</script>

<template>
  <div class="book-card">
    <ReviewWindow ref="reviewWindowRef" />

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
        <span @click.stop="onOpenReviewWindow(book.bookId, book.title, book.cover)">
          <MachineLearningModel class="icon open-review-window" />
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
  </div>
</template>

<style scoped>
.book-card {
  display: flex;
}
.cover {
  width: 90px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  flex-shrink: 0;
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
.open-review-window:hover {
  color: #18a058;
  cursor: pointer;
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
</style>
