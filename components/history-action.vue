<script setup>
import { NButton } from 'naive-ui';
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
      <NButton size="small" secondary strong @click="onPrev">上月</NButton>
      <NButton size="small" secondary strong @click="onToday">今天</NButton>
      <NButton size="small" secondary strong @click="onNext">下月</NButton>
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
