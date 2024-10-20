import { formatTime, formatReadingTime } from './helper';

function renderMarkdown(data: any) {
  const {
    cover,
    title,
    author,
    translator,
    reviewCount,
    noteCount,
    finishTime,
    readingTime,
    progress,
    notes,
  } = data;
  const header = [
    `# ${title}`,
    `>  ![${title}](${cover} "${title}")`,
    `>  [作者] ${author}`,
    `${translator ? '>  [翻译] ' + translator : ''}`,
    `>  [划线] ${noteCount}`,
    `>  [想法] ${reviewCount}`,
    `>  [阅读时间] ${formatReadingTime(readingTime)}`,
    `>  ${finishTime ? '[阅读完成] ' + formatTime(finishTime) : '[阅读进度] ' + progress + '%'}`,
  ]
    .filter(Boolean)
    .join('\n');
  // { reviewText, reviewCreateTime, reviewAbstract, range, markText, markCreateTime }[]
  const getNotes = (notes: any[]) => {
    return notes
      .map((note) => {
        const { reviewText, reviewCreateTime, reviewAbstract, markText, markCreateTime } = note;
        const text = (markText || reviewAbstract || '').replace(/>/g, '-');
        const createTime = markCreateTime || reviewCreateTime;
        let str = `${text} [记录于 ${formatTime(createTime)}]`;
        if (reviewText) {
          str += `\n> ${reviewText.replace(/>/g, '-')}`;
        }
        str += '\n\n';
        return str;
      })
      .join('');
  };
  const chapter = notes.map((note: any) => {
    const { chapterTitle, notes } = note;
    return `## ${chapterTitle}\n\n${getNotes(notes)}`;
  });
  return [header, ...chapter, '> 由浏览器插件 bookline 导出'].join('\n');
}
function renderHTML(data: any) {
  const {
    cover,
    title,
    author,
    translator,
    reviewCount,
    noteCount,
    finishTime,
    readingTime,
    progress,
    notes,
  } = data;
  const getNotes = (notes: any[]) => {
    return notes
      .map((note) => {
        const { reviewText, reviewCreateTime, reviewAbstract, markText, markCreateTime } = note;
        const text = markText || reviewAbstract;
        const createTime = markCreateTime || reviewCreateTime;
        let str = `
          <div class="notes">
            <div class="text">${text}</div>
            <div></div/>
            <div class="time">${formatTime(createTime)}</div>
          </div>
        `;
        if (reviewText) {
          str = str.replace('<div></div/>', `<div class="review">[评] ${reviewText}</div>`);
        }
        return str;
      })
      .join('');
  };
  const getChapter = (chapters: any[]) => {
    return chapters
      .map((chapter) => {
        const { chapterTitle, notes } = chapter;
        return `
          <div class="chapter">
            <div class="chapter-title">${chapterTitle}</div>
            ${getNotes(notes)}
          </div>
        `;
      })
      .join(' ');
  };
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-lite-webfont@1.1.0/style.css"
      />
      <title>${title} [${author}]</title>
      <style>
        body {
          margin: 0;
          max-width: 600px;
          padding: 32px;
          margin: 0 auto;
          font-family: 'LXGW WenKai Lite', sans-serif;
        }
        .header {
          display: flex;
          gap: 16px;
        }
        .cover {
          width: 100px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .title {
          width: 484px;
          font-size: 24px;
          margin-bottom: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .content {
          margin: 24px 0;
        }
        .chapter-title {
          margin: 16px 0 8px 0;
          font-size: 20px;
        }
        .notes {
          position: relative;
          margin-bottom: 8px;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e9e9e9;
        }
        .text {
          line-height: 1.5;
          padding-bottom: 2px;
        }
        .review {
          border-top: 1px solid #f3f3f3;
          line-height: 1.5;
          color: #666;
          padding-top: 2px;
        }
        .time {
          position: absolute;
          right: 16px;
          bottom: 2px;
          color: #999;
          font-size: 12px;
        }
        .footer {
          text-align: right;
          color: #999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${cover}" alt="${title}" class="cover" />
        <div class="info">
          <div class="title">${title}</div>
          <div>
            <span>[作] ${author}</span>
            <span>${translator ? '[译] ' + translator : ''}</span>
          </div>
          <div>
            <span>${noteCount} 条划线</span>
            <span>${reviewCount} 个想法</span>
          </div>
          <div>阅读时间 ${formatReadingTime(readingTime)}</div>
          <div>
            ${finishTime ? '阅读完成于 ' + formatTime(finishTime) : '阅读进度 ' + progress + '%'}
          </div>
        </div>
      </div>

      <div class="content">
        ${getChapter(notes)}
      </div>

      <div class="footer">Exported by bookline</div>
    </body>
  </html>
  `;
}
function renderJSON(data: any) {
  const wrapper = {
    exportedBy: 'bookline',
    author: 'Jarry Chung',
    data,
  };
  return JSON.stringify(wrapper, null, 2);
}
function renderText(data: any) {
  const {
    cover,
    title,
    author,
    translator,
    reviewCount,
    noteCount,
    finishTime,
    readingTime,
    progress,
    notes,
  } = data;
  const header = [
    `[书籍] ${title}`,
    `[封面] ${cover}`,
    `[作者] ${author}`,
    `${translator ? '[翻译] ' + translator : ''}`,
    `[划线] ${noteCount}`,
    `[想法] ${reviewCount}`,
    `[阅读时间] ${formatReadingTime(readingTime)}`,
    `${finishTime ? '[阅读完成] ' + formatTime(finishTime) : '[阅读进度] ' + progress + '%'}`,
    `--------------------------------\n`,
  ]
    .filter(Boolean)
    .join('\n');
  // { reviewText, reviewCreateTime, reviewAbstract, range, markText, markCreateTime }[]
  const getNotes = (notes: any[]) => {
    return notes
      .map((note) => {
        const { reviewText, reviewCreateTime, reviewAbstract, markText, markCreateTime } = note;
        const text = markText || reviewAbstract;
        const createTime = markCreateTime || reviewCreateTime;
        let str = `---\n${text} [记录于 ${formatTime(createTime)}]`;
        if (reviewText) {
          str += `\n| ${reviewText}`;
        }
        str += '\n\n';
        return str;
      })
      .join('');
  };
  const chapter = notes.map((note: any) => {
    const { chapterTitle, notes } = note;
    return `>>> ${chapterTitle}\n\n${getNotes(notes)}`;
  });
  return [header, ...chapter, '"由浏览器插件 bookline 导出"'].join('\n');
}

export const suffixMap: Record<string, string> = {
  markdown: 'md',
  html: 'html',
  json: 'json',
  text: 'txt',
};

export const renderMap: Record<string, (data: any) => string> = {
  markdown: renderMarkdown,
  html: renderHTML,
  json: renderJSON,
  text: renderText,
};

// data 格式为 { bookId, cover, title, author, translator, reviewCount, noteCount, bookmarkCount, progress, notes: [{ chapterUid, chapterTitle, chapterIdx, notes: [{ reviewText, reviewCreateTime, reviewAbstract, range, markText, markCreateTime }] }] }
export function render(data: any, format: string = 'markdown') {
  const renderFn = renderMap[format];
  return renderFn(data);
}
