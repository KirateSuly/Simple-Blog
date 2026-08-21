export type LyricLine = {
  time: number;
  text: string;
};

/** 解析 LRC 歌词文本为带时间戳的行数组 */
export function parseLrc(lrc: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const timeTag = /\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;

  for (const raw of lrc.split(/\r?\n/)) {
    const tags = [...raw.matchAll(timeTag)];
    if (tags.length === 0) continue;
    const text = raw.replace(timeTag, "").trim();
    for (const tag of tags) {
      const min = parseInt(tag[1], 10);
      const sec = parseInt(tag[2], 10);
      const ms = tag[3] ? parseInt(tag[3].padEnd(3, "0"), 10) / 1000 : 0;
      lines.push({ time: min * 60 + sec + ms, text });
    }
  }

  lines.sort((a, b) => a.time - b.time);
  return lines;
}

/** 根据当前播放时间找出应该高亮的歌词行索引 */
export function findLyricIndex(lyrics: LyricLine[], time: number): number {
  let idx = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].time <= time) idx = i;
    else break;
  }
  return idx;
}
