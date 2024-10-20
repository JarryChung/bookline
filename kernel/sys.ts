import { defineStore } from 'pinia';
import { DataBlob, CalendarHeatMap, ChartWaterfall, Settings } from '@vicons/carbon';
import Note from '@/components/note.vue';
import History from '@/components/history.vue';
import Stat from '@/components/stat.vue';
import Setting from '@/components/setting.vue';
import NoteAction from '@/components/note-action.vue';
import HistoryAction from '@/components/history-action.vue';
import StatAction from '@/components/stat-action.vue';
import SettingAction from '@/components/setting-action.vue';

type Tab = 'note' | 'history' | 'stat' | 'setting';

export const navList = [
  { key: 'note', label: '笔记', icon: DataBlob },
  { key: 'history', label: '历史', icon: CalendarHeatMap },
  { key: 'stat', label: '统计', icon: ChartWaterfall },
  { key: 'setting', label: '设置', icon: Settings },
] as const;
export const contentMap = {
  note: { component: Note, action: NoteAction },
  history: { component: History, action: HistoryAction },
  stat: { component: Stat, action: StatAction },
  setting: { component: Setting, action: SettingAction },
} as const;

export const useNavStore = defineStore('nav', () => {
  const activeTab = ref<Tab>('note');

  const setActiveTab = (tab: Tab) => {
    activeTab.value = tab;
  };

  return { activeTab, setActiveTab };
});
