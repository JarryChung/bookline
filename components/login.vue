<script lang="ts" setup>
import { Beta } from '@vicons/carbon';
</script>

<template>
  <div class="login">
    <Beta class="logo" />
    <div class="tips">
      <span class="title">bookline</span>
      <span class="text">
        尚未登录，请
        <a href="https://weread.qq.com/#login" target="_blank">点击</a>
        登录微信读书，然后重新打开该助手
      </span>
    </div>
  </div>
</template>

<style scoped>
.login {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.logo {
  width: 69%;
  position: absolute;
  top: 0;
  left: -90px;
}
.tips {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  width: 50%;
}
.title {
  text-align: center;
  font-size: 56px;
  color: #333;
}
.text {
  font-size: 18px;
}
</style>
