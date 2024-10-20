<script lang="ts" setup>
import Login from '@/components/login.vue';
import Page from '@/components/page.vue';
import { useUserStore } from '@/kernel/user';

const user = useUserStore();
</script>

<template>
  <Page v-if="user.isLogin" />
  <Login v-else />
</template>

<style scoped></style>
