<script setup>
import { useRandomNoteStore } from '@/kernel/review';
import { NButton } from 'naive-ui';
import { IbmDataReplication } from '@vicons/carbon';

function getRandomNote() {
  const randomNoteStore = useRandomNoteStore();
  randomNoteStore.getRamdomNotes();
}
</script>

<template>
  <div class="review-action">
    <NButton size="small" secondary strong @click="getRandomNote">
      <template #icon><IbmDataReplication /></template>
    </NButton>
  </div>
</template>

<style scoped></style>
