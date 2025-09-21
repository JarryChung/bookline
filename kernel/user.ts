import { defineStore } from 'pinia';
import { useAsyncResource } from './helper';

export const useUserStore = defineStore('user', () => {
  const userData = useAsyncResource(() =>
    fetch('https://weread.qq.com/web/pay/memberCardSummary').then((res) => res.json()),
  );

  const isLogin = computed(() => {
    return !userData.data.value?.errCode;
  });

  return { info: { name: 'bookline', userVid: 'bookline', avatar: 'bookline' }, isLogin };
});
