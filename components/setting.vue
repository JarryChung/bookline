<script setup>
import { NDivider } from 'naive-ui';

const projects = [
  { name: 'vue', url: 'https://github.com/vuejs/core' },
  { name: 'vue-tsc', url: 'https://github.com/vuejs/language-tools/tree/master/packages/tsc' },
  { name: 'pinia', url: 'https://github.com/vuejs/pinia' },
  { name: 'echarts', url: 'https://github.com/apache/echarts' },
  { name: 'wxt', url: 'https://github.com/wxt-dev/wxt' },
  { name: 'jszip', url: 'https://github.com/Stuk/jszip' },
  { name: 'file-saver', url: 'https://github.com/eligrey/FileSaver.js' },
  { name: 'typescript', url: 'https://github.com/microsoft/TypeScript/#readme' },
  { name: 'naive-ui', url: 'https://github.com/tusen-ai/naive-ui' },
  { name: 'vicons/carbon', url: 'https://github.com/07akioni/xicons' },
  { name: 'normalize.css', url: 'https://github.com/necolas/normalize.css/' },
  { name: '霞鹜文楷', url: 'https://github.com/lxgw/LxgwWenKai' },
];
</script>

<template>
  <div>
    <NDivider title-placement="left" class="divider">通用设置</NDivider>
    <p>拼命开发中</p>

    <NDivider title-placement="left" class="divider">后续计划</NDivider>
    <ul>
      <li>支持导出为图片</li>
      <li>支持支持导出至 Obsidian、Notion、Flomo、Logseq、Readwise、思源笔记等应用</li>
    </ul>

    <NDivider title-placement="left" class="divider">关于</NDivider>
    <div class="about">
      <p>
        作者承诺 bookline
        永久免费，未来所有新增功能均不收费，期望为每一位爱读书的朋友提供便捷的导出、回顾、统计、分享工具。
      </p>
      <p>想请作者喝一杯廉价咖啡? Thanks!!! 请使用 VX 扫码 👉</p>
      <p>
        via
        <a href="https://github.com/JarryChung">Jarry Chung</a>
      </p>

      <img src="./qrcode.svg" alt="qrcode" class="qrcode" />
    </div>

    <NDivider title-placement="left" class="divider">致谢</NDivider>
    <div class="projects">
      <a v-for="project in projects" :key="project.name" :href="project.url" target="_blank">
        {{ project.name }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.about {
  position: relative;
}
.qrcode {
  width: 120px;
  position: absolute;
  top: 20px;
  right: 0;
}
.divider {
  margin-bottom: 12px;
}
.divider:nth-child(1) {
  margin-top: 0;
}
.projects {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
