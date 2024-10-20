<script setup>
import { NAvatar, NPopover } from 'naive-ui';
import { useUserStore } from '@/kernel/user';

const user = useUserStore();
</script>

<template>
  <NPopover>
    <template #trigger>
      <NAvatar size="small" :src="user.info.avatar" class="avatar" />
    </template>
    <div class="user-info">
      <span class="user-name">{{ user.info.name }}</span>
      <span>ID: {{ user.info.userVid }}</span>
    </div>
  </NPopover>
</template>

<style scoped>
.avatar {
  cursor: pointer;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.user-name {
  font-size: 18px;
  font-weight: 700;
}
</style>
