<script setup>
import { ref } from 'vue';
import { NButton, NPopover, NBadge } from 'naive-ui';
import { Download, StackedMove } from '@vicons/carbon';
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
const setIsSelecting = (is) => {
  deleteAll();
  selection.setIsSelecting(is);
};

const popoverRef = ref(null);
const closePopover = () => {
  popoverRef.value.setShow(false);
};

const note = useNoteStore();
const onDownload = (format) => {
  note.download(format);
  closePopover();
};
</script>

<template>
  <div class="note-action">
    <div v-if="selection.isSelecting" class="select">
      <NButton size="small" secondary strong @click="setAll">选择全部</NButton>
      <NButton size="small" secondary strong @click="deleteAll">移除全部</NButton>
      <NPopover placement="bottom" trigger="click" ref="popoverRef">
        <template #trigger>
          <NBadge :value="selection.selected.length" type="success">
            <NButton size="small" secondary strong :disabled="selection.selected.length <= 0">
              <template #icon>
                <Download />
              </template>
            </NButton>
          </NBadge>
        </template>

        <div class="format">
          <label>请选择导出格式</label>
          <NButton size="small" secondary @click="onDownload('markdown')">Markdown</NButton>
          <NButton size="small" secondary @click="onDownload('html')">HTML</NButton>
          <NButton size="small" secondary @click="onDownload('json')">JSON</NButton>
          <NButton size="small" secondary @click="onDownload('text')">Text</NButton>
        </div>
      </NPopover>
      <NPopover placement="bottom" trigger="click" ref="popoverRef" :width="200">
        <template #trigger>
          <NButton size="small" secondary strong :disabled="selection.selected.length <= 0">
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
      取消
    </NButton>
    <NButton v-else size="small" secondary strong @click="setIsSelecting(true)">导出</NButton>
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
