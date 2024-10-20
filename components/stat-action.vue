<script setup>
import { computed } from 'vue';
import { NButton } from 'naive-ui';
import { useYearStore } from '@/kernel/stat';

const year = useYearStore();

const yearText = computed(() => {
  if (year.current === 0) {
    return '所有';
  }
  return year.current;
});

const onNext = () => {
  year.toNextYear();
};

const onPrev = () => {
  year.toPrevYear();
};

const onToday = () => {
  year.toThisYear();
};

const onAll = () => {
  year.toAll();
};
</script>

<template>
  <div class="stat-action">
    <div class="year">{{ yearText }}</div>
    <div class="change">
      <NButton size="small" secondary strong @click="onAll">所有</NButton>
      <NButton size="small" secondary strong @click="onPrev">上年</NButton>
      <NButton size="small" secondary strong @click="onToday">今年</NButton>
      <NButton size="small" secondary strong @click="onNext">下年</NButton>
    </div>
  </div>
</template>

<style scoped>
.stat-action {
  display: flex;
  gap: 12px;
}
.year {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.change {
  display: flex;
  gap: 4px;
}
</style>
