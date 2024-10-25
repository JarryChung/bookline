<script setup>
import { useRandomNoteStore } from '@/kernel/review';
import { NButton } from 'naive-ui';

function getRandomNote() {
  const randomNoteStore = useRandomNoteStore();
  randomNoteStore.getRamdomNotes();
}
</script>

<template>
  <div class="review-action">
    <NButton size="small" secondary strong @click="getRandomNote">换一换</NButton>
  </div>
</template>

<style scoped></style>
