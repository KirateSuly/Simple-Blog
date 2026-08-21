# 个人博客

基于 **Next.js 15（App Router）+ React 19 + Tailwind CSS 4** 构建的极致毛玻璃风格个人博客。

## 当前进度（P0 – P2）

- **首页**：个人介绍（Hero）、轮播图、内嵌音乐播放器（播放/暂停、上一首/下一首、音量、歌词同步）、内容速览
- **全局**：毛玻璃导航栏、页脚、光斑背景、通用 `GlassCard`
- **导航**：首页 / 项目 / 文章 / 说说 / 音乐 / 照片墙 / 杂谈 / 关于（后 7 个为占位页，将在 P3 之后逐步实现）

完整设计与分阶段计划见 [`开发计划.md`](./开发计划.md)。

## 快速开始

```bash
npm install      # 安装依赖
npm run dev      # 本地开发：http://localhost:3000
npm run build    # 生产构建
npm run start    # 启动生产服务（需先 build）
```

## 目录结构

```
app/                    页面（App Router）
components/layout/      导航、页脚、背景
components/home/        Hero、轮播图、内容速览
components/music/       音乐 Provider、播放器
components/ui/          玻璃卡片、图标、占位页
lib/                    site 站点配置、music 歌单、lrc 歌词解析
public/lyrics/          LRC 歌词文件
public/covers/          轮播图 / 封面
```

## 常用配置

| 内容 | 位置 |
|---|---|
| 站点信息 / 社交 / 轮播文案 | `lib/site.ts` |
| 歌单（歌名/歌手/音频/歌词/封面） | `lib/music.ts` |
| 歌词文件 | `public/lyrics/*.lrc` |
| 主题色 / 毛玻璃样式 | `app/globals.css` |

> 注意：`lib/music.ts` 里的音频是演示用的公开测试音频（SoundHelix 示例 MP3），
> 上线时请替换为你云存储上的真实音频地址，并为对象存储开启 CORS。
