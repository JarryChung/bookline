<script setup>
import { ref } from 'vue';
import { ArrowLeft } from '@vicons/carbon';
import { NDrawer, NDrawerContent } from 'naive-ui';
import { useNoteStore } from '@/kernel/note';
import { formatTime } from '@/kernel/helper';

const isOpened = ref(false);
const book = reactive({ bookId: '', title: '', cover: '' });
const booknotes = ref([]);

const note = useNoteStore();
async function fetchBookNotes(bookId) {
  const noteData = await note.fetchNotes([bookId]);
  if (noteData.length === 0) {
    return [];
  }
  const notes = noteData?.[0].notes || [];
  booknotes.value = notes;
}

function close() {
  isOpened.value = false;
}
function open(bookId, title, cover) {
  book.bookId = bookId;
  book.title = title;
  book.cover = cover;
  fetchBookNotes(bookId);
  isOpened.value = true;
}
defineExpose({ open });

function getText(note) {
  const { markText, reviewAbstract } = note;
  return markText || reviewAbstract;
}
function getCreateTime(note) {
  const { markCreateTime, reviewCreateTime } = note;
  return formatTime(markCreateTime || reviewCreateTime);
}
</script>

<template>
  <NDrawer v-model:show="isOpened" placement="left" :width="700" :trap-focus="false">
    <NDrawerContent :native-scrollbar="false">
      <template #header>
        <div class="header">
          <ArrowLeft class="icon" @click="close" />
          <img :src="book.cover" alt="cover" class="cover" />
          <div class="title">{{ book.title }}</div>
        </div>
      </template>

      <div class="content">
        <div class="chapter" v-for="chapter of booknotes" :key="chapter.chapterId">
          <div class="chapter-title">{{ chapter.chapterTitle }}</div>
          <div class="notes" v-for="note of chapter.notes">
            <div class="text">{{ getText(note) }}</div>
            <div class="review" v-if="note.reviewText">[评] {{ note.reviewText }}</div>
            <div class="time">{{ getCreateTime(note) }}</div>
          </div>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.header {
  display: flex;
  gap: 10px;
}
.icon {
  width: 18px;
  vertical-align: text-bottom;
  cursor: pointer;
}
.cover {
  height: 18px;
}
.title {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
}

.chapter-title {
  margin: 16px 0 8px 0;
  font-size: 20px;
}
.chapter:first-of-type .chapter-title {
  margin-top: 0;
}
.notes {
  position: relative;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e9e9e9;
}
.text {
  white-space: pre-wrap;
  line-height: 1.5;
  padding-bottom: 2px;
}
.review {
  border-top: 1px solid #f3f3f3;
  line-height: 1.5;
  color: #666;
  padding-top: 2px;
}
.time {
  position: absolute;
  right: 16px;
  bottom: 2px;
  color: #999;
  font-size: 12px;
}
</style>
