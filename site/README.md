# 仙子大战女巫 · 森林仙子村有声绘本

> 为6岁女儿创作的儿童奇幻有声绘本系列。由妈妈负责工程化（用 Astro 7），女儿负责故事创意口述。

## 故事

| 集 | 标题 | 状态 | 时长 |
| --- | --- | --- | --- |
| EP.01 | 冰火仙子 | ✅ 已上线 | 约 12 分钟 |
| EP.02 | 植物梦幻仙子 | ✅ 已上线 | 约 11 分钟 |
| EP.03 | 白雪仙子 | ✅ 已上线 | 约 13 分钟 |
| EP.04 | 恶魔王大战斗 | ✅ 已上线 | 约 10 分钟 |

## 运行

```bash
# 开发模式（热更新，访问 http://localhost:4321）
npm run dev

# 构建静态站点（输出到 dist/）
npm run build

# 预览构建结果
npm run preview
```

## 技术栈

- **Astro 7** — 静态站点框架
- **TypeScript** — 类型安全
- **原生 CSS** — 复用 `shared.css`（来自原 HTML 原型）
- 零运行时 JS，仅在交互组件中按需引入

## 项目结构

```
fairy-tale/
├── public/
│   ├── assets/
│   │   ├── audio/      # 4 集配音 mp3
│   │   ├── banners/    # 网站 banner
│   │   ├── characters/ # 10 位角色立绘
│   │   └── covers/     # 各集封面
│   └── favicon.svg
├── src/
│   ├── data/
│   │   ├── characters.ts  # 角色档案
│   │   └── episodes.ts    # 故事分集数据
│   ├── layouts/
│   │   └── Base.astro     # 全站布局（导航/页脚/字体）
│   ├── pages/
│   │   ├── index.astro         # 首页（最新一集 + 角色卡片）
│   │   ├── story-list.astro    # 故事列表（带筛选 tabs）
│   │   ├── characters.astro    # 角色名册（带详情模态）
│   │   └── story/[slug].astro  # 故事详情（带音频播放器）
│   ├── styles/
│   │   └── shared.css     # 设计 token + 组件样式
│   └── content/           # 故事 markdown 源文件
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 数据来源

- **故事**：口述大纲保存在 `src/content/`（中文 markdown），结构化数据在 `src/data/episodes.ts`
- **角色**：视觉特征来自 `assets/characters/`，人物设定在 `src/data/characters.ts`
- **音频**：用 MiniMax MiMo TTS（克隆女儿声音）+ mmx-cli (Chinese (Mandarin)_Cute_Spirit) 生成，mp3 存放在 `public/assets/audio/`

## 设计系统

参照 `brand-spec.md`：暖米黄纸感底色 + 一角色一颜色标签（冰蓝/暖红/嫩绿/橙/雪蓝/梦粉紫/暗紫），所有颜色用 OKLch 色空间。