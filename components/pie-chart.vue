<script setup>
import { computed, ref, onMounted } from 'vue';
import { NButton } from 'naive-ui';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, TransformComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';

echarts.use([
  PieChart,
  TooltipComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
]);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const data = computed(() => {
  return props.data;
});

let chartInstance = ref(null);

watch(data, () => {
  if (chartInstance.value) {
    chartInstance.value.setOption({
      series: [
        {
          data: data.value,
        },
      ],
    });
  }
});

const isNext = ref(false);

const onBack = () => {
  isNext.value = false;
  chartInstance.value.setOption({
    series: [
      {
        data: data.value,
      },
    ],
  });
};

const chart = ref(null);
onMounted(() => {
  chartInstance.value = echarts.init(chart.value);
  chartInstance.value.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        type: 'pie',
        roseType: 'area',
        data: data.value,
      },
    ],
  });

  chartInstance.value.on('click', (params) => {
    const data = params.data;
    if (data.children) {
      chartInstance.value.setOption({
        series: [
          {
            data: data.children,
          },
        ],
      });
      isNext.value = true;
    }
  });
});
</script>

<template>
  <div class="wrapper">
    <div ref="chart" class="pie-chart"></div>
    <NButton v-if="isNext" size="tiny" secondary strong @click="onBack" class="back-btn">
      返回
    </NButton>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}
.pie-chart {
  width: 400px;
  height: 290px;
}
.back-btn {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
