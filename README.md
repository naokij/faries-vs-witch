# 仙女大战女巫 · 森林仙子村有声绘本

为 6 岁女儿创作的儿童奇幻有声绘本系列。女儿负责故事创意口述和配音，妈妈负责工程化。

## 项目结构

```
faries-vs-witch/
├── assets/              ← 图片（角色立绘、banner、封面）
│   ├── banners/         ← 网站横幅
│   ├── characters/      ← 角色立绘（16 位角色）
│   └── covers/          ← 各集封面（1:1 正方形）
├── audio/               ← 配音 mp3（MiniMax TTS 生成）
├── stories/             ← 故事正文 markdown
├── docs/                ← 世界观与角色设定
├── site/                ← Astro 7 网站源码
│   ├── public/          ← 构建时自动同步 assets/ + audio/
│   ├── src/
│   │   ├── data/        ← episodes.ts + characters.ts
│   │   ├── pages/       ← 7 个页面
│   │   └── styles/      ← 设计系统 CSS
│   ├── scripts/         ← sync-assets.sh 同步资源
│   └── dist/            ← 构建产物（可部署）
└── README.md
```

## 技术栈

- **Astro 7** — 静态站点生成器
- **TypeScript** — 类型安全
- **原生 CSS** — OKLch 色空间，设计 token 系统
- 本地字体（ZCOOL KuaiLe / Noto Sans SC / Ma Shan Zheng）
- 音频播放 + ASR 逐字高亮 + 拼音标注

## 日常更新

### 1. 加新故事
```bash
# 写故事正文
编辑 stories/5-新集.md

# 配图 → 放到 assets/covers/ 和 assets/characters/

# 配音 → 放到 audio/
mmx speech synthesize --text "$(cat story.txt)" --voice "Chinese (Mandarin)_Cute_Spirit"

# 更新网站数据
编辑 site/src/data/episodes.ts   # 加新集信息
编辑 site/src/data/characters.ts # 更新角色（如有新增）

# 生成 ASR 时间戳 + 对齐
bash site/scripts/asr.sh audio/5-新集.mp3
python3 site/scripts/align-asr.py stories/5-新集.md site/data/asr/5-新集.json site/data/asr/5-新集.aligned.json
```

### 2. 构建网站
```bash
cd site
npm run build                # 输出到 dist/
npm run dev -- --host        # 局域网预览 http://192.168.x.x:4321
```

### 3. 部署
`site/dist/` 是纯静态文件，可直接部署到任意静态托管服务。

## 故事列表

| 集 | 标题 | 时长 | 状态 |
| --- | --- | --- | --- |
| EP.01 | 冰火仙子 | 12 分 | ✅ 已上线 |
| EP.02 | 植物梦幻仙子 | 11 分 | ✅ 已上线 |
| EP.03 | 白雪仙子 | 13 分 | ✅ 已上线 |
| EP.04 | 恶魔王大战斗 | 10 分 | ✅ 已上线 |

## 数据流程

```
stories/*.md          ← 故事正文（创作）
audio/*.mp3           ← 配音（TTS 生成）
assets/               ← 配图
  │
  ▼
site/src/data/        ← 结构化数据（episodes.ts + characters.ts）
site/public/          ← 资源同步（prebuild 自动 cp）
  │
  ▼
site/dist/            ← Astro 构建输出（纯静态 HTML）
```

## 设计系统

参照 `brand-spec.md`：暖米黄纸感底色 `oklch(97% 0.018 80)`，一角色一颜色标签，所有颜色用 OKLch 色空间，圆角柔和，适合 6 岁读者。

## 角色（16 位）

| 角色 | 身份 | 登场 |
|------|------|------|
| 阿玛利亚 | 仙子首领 | EP.01 |
| 梦梦 | 宝宝仙子（紫） | EP.01 |
| 苗苗 | 宝宝仙子（绿） | EP.01 |
| 悠悠 | 宝宝仙子（橙） | EP.01 |
| 冰冰 | 冰仙子 | EP.01 |
| 火火 | 火仙子 | EP.01 |
| 月月 | 植物仙子 | EP.02 |
| 境境 | 梦幻仙子 | EP.02 |
| 蓉蓉 | 白雪仙子 | EP.03 |
| 巫巫女 | 反派女巫 | EP.01 |
| 库克多 | 精灵王子守卫 | EP.03 |
| 健健 | 精灵王子 | EP.03 |
| 包包 | 小豆包仙子 | EP.03 |
| 恶魔王 | 反派魔王 | EP.04 |
| 女蝙蝠侠 | 反派战士 | EP.04 |
| Kiki | 三花猫仙子 | EP.04 |
