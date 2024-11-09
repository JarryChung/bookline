import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'bookline - 微信读书笔记导出与回顾',
    host_permissions: ['https://i.weread.qq.com/*'],
  },
});
