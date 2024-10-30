<script setup>
import { NButton, NButtonGroup } from 'naive-ui';
import { ChevronLeft, ChevronRight, RadioButton } from '@vicons/carbon';
import { useCalendarStore } from '@/kernel/calendar';

const calendar = useCalendarStore();
const onNext = () => {
  calendar.toNextMonth();
};
const onPrev = () => {
  calendar.toPrevMonth();
};
const onToday = () => {
  calendar.toToday();
};
</script>

<template>
  <div class="history-action">
    <div class="date">{{ calendar.date.year }}年{{ calendar.date.month }}月</div>
    <div class="change">
      <NButtonGroup>
        <NButton size="small" secondary strong @click="onPrev">
          <template #icon><ChevronLeft /></template>
        </NButton>
        <NButton size="small" secondary strong @click="onToday">
          <template #icon><RadioButton /></template>
        </NButton>
        <NButton size="small" secondary strong @click="onNext">
          <template #icon><ChevronRight /></template>
        </NButton>
      </NButtonGroup>
    </div>
  </div>
</template>

<style scoped>
.history-action {
  display: flex;
  gap: 12px;
}
.date {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.change {
  display: flex;
  gap: 4px;
}
</style>
