import { defineStore } from 'pinia';
import { useAsyncResource } from './helper';

export const useUserStore = defineStore('user', () => {
  const userData = useAsyncResource(() =>
    fetch('https://i.weread.qq.com/friend/ranking?mine=1').then((res) => res.json()),
  );

  const info = computed(() => {
    const { name, userVid, avatar } = userData.data.value?.ranking?.[0]?.user || {};
    return { name, userVid, avatar };
  });

  const isLogin = computed(() => !!info.value.userVid);

  return { info, isLogin };
});
