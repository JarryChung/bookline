<script setup>
import { NTabs, NTabPane, NCard } from 'naive-ui';
import { Beta } from '@vicons/carbon';
import { navList, useNavStore } from '@/kernel/sys';

const nav = useNavStore();
const setActiveTab = (tabKey) => {
  nav.setActiveTab(tabKey);
};
</script>

<template>
  <div class="layout">
    <div class="header">
      <div class="inter">
        <div class="logo">
          <Beta class="icon" />
        </div>
        <NTabs type="segment" size="small" class="tabs" @update:value="setActiveTab">
          <NTabPane v-for="item in navList" :key="item.key" :name="item.key" class="tab-pane">
            <template #tab>
              <component :is="item.icon" class="icon" />
            </template>
          </NTabPane>
        </NTabs>
      </div>
      <div class="action">
        <slot name="action" />
      </div>
    </div>

    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.inter {
  display: flex;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}
.logo:hover {
  border: 1px solid #18a058;
  background-color: #18a058;
}
.logo:hover .icon {
  transform: scale(1.2) translate3d(0, 3px, 0);
}
.tabs {
  width: 220px;
  margin-left: 8px;
  flex-shrink: 0;
}
.tab-pane {
  padding: 0 !important;
}
.icon {
  height: 24px;
  transition: all 0.3s ease-in-out;
}
.action {
  display: flex;
  align-items: flex-end;
}
.content {
  margin-top: 12px;
  max-height: 402px; /* 500 - 24 * 2(padding) - 38(nav) - 12(margin-tap) */
  overflow: auto;
}
</style>
