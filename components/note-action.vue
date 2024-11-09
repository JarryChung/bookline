<script setup>
import { ref } from 'vue';
import { NButton, NPopover, NBadge, useMessage } from 'naive-ui';
import { Download, StackedMove, RadioButton, Recording, RadioButtonChecked } from '@vicons/carbon';
import { useSelectionStore, useNoteStore } from '@/kernel/note';
import { useBookStore } from '@/kernel/book';

const book = useBookStore();
const selection = useSelectionStore();
const setAll = () => {
  selection.setSelected(book.bookIds);
};
const deleteAll = () => {
  if (selection.selected.length) {
    selection.setSelected([]);
  }
};
const toggleSelected = () => {
  if (selection.selected.length < book.bookIds.length) {
    setAll();
  } else {
    deleteAll();
  }
};
const setIsSelecting = (is) => {
  deleteAll();
  selection.setIsSelecting(is);
};

const nonSelected = computed(() => selection.selected.length === 0);
const someSelected = computed(
  () => selection.selected.length > 0 && selection.selected.length < book.bookIds.length,
);
const allSelected = computed(() => selection.selected.length === book.bookIds.length);

const popoverRef = ref(null);
const closePopover = () => {
  popoverRef.value.setShow(false);
};

const note = useNoteStore();
const message = useMessage();
const onDownload = async (format) => {
  await note.download(format);
  message.success(`导出成功`, { closable: true });
  closePopover();
};
</script>

<template>
  <div class="note-action">
    <div v-if="selection.isSelecting" class="select">
      <NBadge :value="selection.selected.length" type="success">
        <NButton size="small" secondary strong @click="toggleSelected">
          <template #icon>
            <RadioButton v-if="nonSelected" />
            <Recording v-if="someSelected" />
            <RadioButtonChecked v-if="allSelected" />
          </template>
        </NButton>
      </NBadge>
      <NPopover placement="bottom" trigger="hover" :disabled="nonSelected" ref="popoverRef">
        <template #trigger>
          <NButton size="small" secondary strong :disabled="nonSelected">
            <template #icon>
              <Download />
            </template>
          </NButton>
        </template>

        <div class="format">
          <label>请选择导出格式</label>
          <NButton size="small" secondary @click="onDownload('markdown')">Markdown</NButton>
          <NButton size="small" secondary @click="onDownload('html')">HTML</NButton>
          <NButton size="small" secondary @click="onDownload('json')">JSON</NButton>
          <NButton size="small" secondary @click="onDownload('text')">Text</NButton>
        </div>
      </NPopover>
      <NPopover placement="bottom" trigger="hover" :width="200" :disabled="nonSelected">
        <template #trigger>
          <NButton size="small" secondary strong :disabled="nonSelected">
            <template #icon>
              <StackedMove />
            </template>
          </NButton>
        </template>

        <div>
          支持导出至 Obsidian、Notion、Flomo、Logseq、Readwise、思源笔记等应用，正在开发中，敬请期待
        </div>
      </NPopover>
    </div>

    <NButton
      v-if="selection.isSelecting"
      size="small"
      secondary
      strong
      @click="setIsSelecting(false)"
    >
      取消导出
    </NButton>
    <NButton v-else size="small" secondary strong @click="setIsSelecting(true)">导出笔记</NButton>
  </div>
</template>

<style scoped>
.note-action {
  display: flex;
  gap: 8px;
}
.select {
  display: flex;
  gap: 4px;
}
.format {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
