import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function downloadZIP(
  fileContents: { [fileName: string]: string },
  title: string = 'bookline-export.zip',
) {
  const zip = new JSZip();

  for (const [fileName, content] of Object.entries(fileContents)) {
    zip.file(fileName, content);
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, title);
  });
}

// TODO: 导出到笔记应用
export function share() {}
