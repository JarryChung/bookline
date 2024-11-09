<script lang="ts" setup>
import { computed } from 'vue';
import { NMessageProvider } from 'naive-ui';
import { useNavStore, contentMap } from '@/kernel/sys';
import Layout from './layout.vue';

const nav = useNavStore();
const current = computed(() => {
  return contentMap[nav.activeTab as keyof typeof contentMap];
});
</script>

<template>
  <Layout>
    <template #action>
      <NMessageProvider>
        <component :is="current.action" />
      </NMessageProvider>
    </template>
    <template #content>
      <component :is="current.component" />
    </template>
  </Layout>
</template>

<style scoped></style>
