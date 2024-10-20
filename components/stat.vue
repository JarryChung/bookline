<script setup>
import { computed } from 'vue';
import { NCard, NDivider } from 'naive-ui';
import { formatReadingTime } from '@/kernel/helper';
import { useStatStore, useYearStore, defaultStat } from '@/kernel/stat';
import PieChart from './pie-chart.vue';

const stat = useStatStore();
const year = useYearStore();

const statData = computed(() => {
  return stat.stat[year.current] || Object.assign({}, defaultStat);
});
</script>

<template>
  <div>
    <NCard>
      <div class="data">
        <div>{{ statData.count }}本书籍</div>
        <NDivider vertical />
        <div>{{ formatReadingTime(statData.readingTime) }}</div>
      </div>
    </NCard>

    <div class="chart">
      <PieChart :data="statData.category" />
    </div>
  </div>
</template>

<style scoped>
.data {
  display: flex;
  justify-content: space-around;
  gap: 12px;
  font-size: 42px;
}
.chart {
  display: flex;
  justify-content: center;
}
</style>

<style>
.n-divider.n-divider--vertical {
  height: none;
}
</style>
