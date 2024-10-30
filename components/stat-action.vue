<script setup>
import { computed } from 'vue';
import { NButton, NButtonGroup } from 'naive-ui';
import { ChevronLeft, ChevronRight, RadioButton, Apps } from '@vicons/carbon';
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
    <div class="year">{{ yearText }}年</div>
    <div class="change">
      <NButton size="small" secondary strong @click="onAll">
        <template #icon><Apps /></template>
      </NButton>
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
