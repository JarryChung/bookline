<script lang="ts" setup>
import { computed } from 'vue';
import { NMessageProvider } from 'naive-ui';
import { useNavStore, contentMap } from '@/kernel/sys';
import Layout from './layout.vue';

const nav = useNavStore();
const current = computed(() => {
  return contentMap[nav.activeTab as keyof typeof contentMap];
});
const transitionName = computed(() => {
  return nav.direction === 'prev' ? 'prev' : 'next';
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
      <Transition :name="transitionName">
        <KeepAlive>
          <component :is="current.component" :key="nav.activeTab" />
        </KeepAlive>
      </Transition>
    </template>
  </Layout>
</template>

<style scoped>
.next-enter {
  opacity: 0;
  transform: translateX(30%);
}
.next-enter-active {
  transition: all 0.3s ease-in-out;
}
.next-leave-active {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateX(-30%);
}

.prev-enter {
  opacity: 0;
  transform: translateX(-30%);
}
.prev-enter-active {
  transition: all 0.3s ease-in-out;
}
.prev-leave-active {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateX(30%);
}
</style>
