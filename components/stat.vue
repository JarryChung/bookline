<script setup>
import { computed } from 'vue';
import { NCard, NDivider, NStatistic, NNumberAnimation } from 'naive-ui';
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
        <NStatistic label="阅读数量" tabular-nums>
          <NNumberAnimation :from="0" :to="statData.count" />
          <template #suffix>本书籍</template>
        </NStatistic>
        <NDivider vertical />
        <NStatistic label="阅读时长">
          <div>{{ formatReadingTime(statData.readingTime) }}</div>
        </NStatistic>
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
