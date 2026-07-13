# 仙子大战女巫 · 森林仙子村有声绘本

为 6 岁女儿创作的儿童奇幻有声绘本系列。女儿负责故事创意口述和配音，妈妈负责工程化。

## 项目结构

```
faries-vs-witch/
├── assets/              ← 图片（角色立绘、banner、封面）
│   ├── banners/         ← 网站横幅
│   ├── characters/      ← 角色立绘（30 位角色）
│   └── covers/          ← 各集封面（1:1 正方形）
├── audio/               ← 配音 mp3（MiniMax TTS 生成）
├── stories/             ← 故事正文 markdown
├── docs/                ← 世界观与角色设定
├── site/                ← Astro 7 网站源码
│   ├── public/          ← 构建时自动同步 assets/ + audio/
│   ├── src/
│   │   ├── data/        ← episodes.ts + characters.ts + asr/*.aligned.json
│   │   ├── pages/       ← 9 个故事页面 + 列表页 + 首页 + 人物页
│   │   └── styles/      ← 设计系统 CSS
│   ├── scripts/         ← sync-assets.sh 同步资源
│   └── dist/            ← 构建产物（可部署）
└── README.md
```

## 部署到 Cloudflare Pages

### Git 集成（自动部署）

1. 把仓库推送到 GitHub
2. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **创建** → **Pages** → **连接到 Git**
3. 选择 `naokij/faries-vs-witch` 仓库
4. 框架预设选 **无**（如果自动检测到了 Astro 也可选 Astro）
5. `wrangler.toml` 已包含构建设置，Cloudflare 会自动读取，无需手动填写
6. 点击 **保存并部署**

之后每次推送 `master` 分支都会自动构建部署。

### 手动构建

```bash
# 本地构建
cd site
npm run build

# 产物在 site/dist/，可直接上传到任意静态托管
```

## 技术栈

- **Astro 7** — 静态站点生成器
- **TypeScript** — 类型安全
- **原生 CSS** — OKLch 色空间，设计 token 系统
- 本地字体（ZCOOL KuaiLe / Noto Sans SC / Ma Shan Zheng）
- 音频播放 + ASR 逐字高亮 + 拼音标注

## 配音

全部用 `mmx-cli`（MiniMax 平台）的 `Chinese (Mandarin)_Cute_Spirit` 音色生成。

```bash
mmx speech synthesize \
  --text "故事正文（带标题）" \
  --voice "Chinese (Mandarin)_Cute_Spirit" \
  --language zh \
  --out 5-新集.mp3
```

### ASR 逐字时间戳
用 `whisper` 对 mp3 做语音识别，提取每个字的起止时间，然后通过对齐脚本映射到原文汉字，实现播放时逐字高亮 + 自动滚动。
```bash
# 1) ASR 识别
whisper audio/5-新集.mp3 --language Chinese --model tiny \
  --word_timestamps True --output_format json

# 2) 对齐到原文（拼音空间对齐：同音字自动修正）
python3 site/scripts/align-asr.py \
  stories/5-新集.md \
  data/asr/5-新集.json \
  data/asr/5-新集.aligned.json

# 3) 校验时间戳质量（0 ERROR 才能上线）
cd site && npm run check:asr
```

### 拼音标注
每个汉字在构建时自动生成拼音（`pinyin-pro` 库），以 `<ruby>` 标签嵌入 HTML，支持拼音显示切换。

## 日常更新

### 1. 写故事 + 配图
```bash
# 写故事正文（markdown）
编辑 stories/5-新集.md

# 配图
# 封面 → assets/covers/5-新集.jpg（1:1 正方形）
# 角色立绘 → assets/characters/（如有新增角色）
```

### 2. 配音（TTS）
```bash
cd site
mmx speech synthesize \
  --text-file ../stories/5-新集.md \
  --voice "Chinese (Mandarin)_Cute_Spirit" \
  --language zh \
  --out ../audio/5-新集.mp3
```

### 3. ASR 逐字时间戳
没有 ASR 数据，播放时不会逐字高亮，拼音也会从 ASR 回退到 pinyin-pro 实时生成（质量较低）。
```bash
cd site
# 3a) Whisper 识别 → data/asr/5-新集.json
bash scripts/asr.sh ../audio/5-新集.mp3

# 3b) 对齐到原文 → data/asr/5-新集.aligned.json
python3 scripts/align-asr.py \
  ../stories/5-新集.md \
  data/asr/5-新集.json \
  data/asr/5-新集.aligned.json

# 3c) 校验时间戳质量（0 ERROR 才能上线）
npm run check:asr
```

### 4. 更新网站数据
```bash
编辑 site/src/data/episodes.ts   # 新集信息（slug、title、cover、audio、status）
编辑 site/src/data/characters.ts # 新角色（如有）
编辑 site/src/pages/index.astro  # featuredChars 数组（如有新角色）
```

### 5. 构建 & 预览
```bash
cd site
npm run build                # 输出到 dist/
npx astro dev --background   # 本地预览 http://localhost:4321
```

### 6. 部署
```bash
git add -A && git commit -m "✨ 新集上线" && git push
```
推送到 `master` 后 Cloudflare Pages 自动构建部署。

### 4. 预告模式（status: 'soon'）

新集可以先以预告状态上线——在列表中显示封面和简介，但点击进去显示"敬请期待"页面，不能听也不能看内容。

```ts
// site/src/data/episodes.ts
{
  slug: '7-新集',
  number: 7,
  title: '新集标题',
  status: 'soon',        // ← 预告状态，列表可见但内容锁定
  cover: '/assets/covers/7-新集.jpg',
  // audio 可以先写上，上线时才会用到
}
```

- 故事列表：显示封面 + "敬请期待"标签 + 灰色"尚未上线"按钮
- 故事页：显示封面 + "本集尚未上线"提示，不渲染播放器和正文
- 上线：把 `status` 改为 `'online'`，推送即可

### 5. 首页人物展示

首页的人物卡片列表在 `site/src/pages/index.astro` 的 `featuredChars` 数组中硬编码了角色 ID。新增角色时需要手动加入：

```ts
const featuredChars = characters.filter(c =>
  ['amalia', 'mengmeng', ..., 'kiki', 'lanlan'].includes(c.id)
);
```

### 6. 故事列表封面

`site/src/pages/story-list.astro` 中所有集数统一用 `<img src={ep.cover}>` 渲染封面。如果新集封面图片没放到位，会显示空白。

## 故事列表

| 集 | 标题 | 时长 | 状态 |
| --- | --- | --- | --- |
| EP.01 | 冰火仙子 | 12 分 | ✅ 已上线 |
| EP.02 | 植物梦幻仙子 | 11 分 | ✅ 已上线 |
| EP.03 | 白雪仙子 | 13 分 | ✅ 已上线 |
| EP.04 | 恶魔王大战斗 | 10 分 | ✅ 已上线 |
| EP.05 | 仙子朋友的故事 | 12 分 | ✅ 已上线 |
| EP.06 | 仙子交了新朋友的故事 | 10 分 | ✅ 已上线 |
| EP.07 | 凯蒂猫仙子翠翠用凯蒂猫攻击魔法打败僵尸魔法师 | 12 分 | ✅ 已上线 |
| EP.08 | 美乐蒂仙子彤彤用美乐蒂魔法攻击打败僵尸魔法师和他的女朋友 | 11 分 | ✅ 已上线 |
| EP.09 | 冰火能量回归 | 12 分 | ✅ 已上线 |
| EP.10 | 仙子首领阿玛克斯 | 16 分 | ✅ 已上线 |
| EP.11 | 朵朵学飞记 | 10 分 | ✅ 已上线 |

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

## 踩坑记录（EP5/EP6 开发）

### 1. ASR 数据加载失败
**问题**：`import.meta.glob('../../data/asr/*.json')` 在构建时无法访问 `src/` 目录以外的文件，导致 `data-words="[]"`，逐字高亮不工作。
**解决**：改用 `fs.readFileSync` 在 Astro frontmatter 中直接读取 JSON 文件。

### 2. 拼音只显示注音没有汉字
**问题**：`pinyin-pro` 的 `type: 'string'` 模式只返回拼音字符串（如 `"è mó wáng"`），不包含原汉字。正则替换匹配不到，导致页面只显示拼音。
**解决**：改用 `type: 'array'` 逐字获取拼音，再与原文字一一配对生成 `<ruby>` 标签。

### 3. Cloudflare Pages 导航高亮错误
**问题**：本地 dev server 的 URL 不带尾部斜杠（`/story-list`），但 Cloudflare Pages 会加尾部斜杠（`/story-list/`）。`location.pathname.split('/').pop()` 对带斜杠的路径返回空字符串，导致匹配失败。
**解决**：先 `replace(/\/+$/, '')` 去掉尾部斜杠再比较。同时对故事子页面做前缀匹配（`/story/5-xxx` 应匹配"故事列表"标签）。

### 4. 故事列表封面不显示
**问题**：`story-list.astro` 中有 `ep.number <= 4` 的硬编码条件，只给前 4 集渲染 `<img>` 封面，后续集数用文字占位。
**解决**：去掉条件判断，所有集数统一渲染封面图。

### 5. 首页人物列表遗漏
**问题**：`index.astro` 的 `featuredChars` 数组硬编码了角色 ID 列表，新增角色需要手动加入。
**解决**：新增角色时记得更新 `featuredChars` 数组。

### 6. 故事连续性
**问题**：新集故事和前一集的剧情衔接需要注意。例如第四集结尾 Kiki 已经来到仙子村，第五集不能又写"第一次遇到 Kiki"。
**建议**：写新集前先回顾前一集结尾，确保人物关系、地点、事件的连续性。

## 设计系统

参照 `brand-spec.md`：暖米黄纸感底色 `oklch(97% 0.018 80)`，一角色一颜色标签，所有颜色用 OKLch 色空间，圆角柔和，适合 6 岁读者。

## 角色（30 位）

| 角色 | 身份 | 登场 |
|------|------|------|
| 阿玛利亚 | 仙子首领 | EP.01 |
| 阿玛克斯 | 仙子首领（爸爸） | EP.10 |
| 梦梦 | 宝宝仙子（紫） | EP.01 |
| 苗苗 | 宝宝仙子（绿） | EP.01 |
| 悠悠 | 宝宝仙子（橙） | EP.01 |
| 朵朵 | 宝宝仙子（粉） | EP.10 |
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
| 兰兰 | 西兰花仙子 | EP.06 |
| 翠翠 | 凯蒂猫仙子 | EP.07 |
| 彤彤 | 美乐蒂仙子 | EP.07 |
| 妮妮 | 绿元素仙子 | EP.07 |
| 可可 | 酷酷仙子 | EP.07 |
| 妙妙 | 晶梦幻仙子 | EP.07 |
| 彩彩 | 彩虹仙子 | EP.07 |
| 虹虹 | 虹元素仙子 | EP.07 |
| 晶晶 | 亮晶晶仙子 | EP.07 |
| 僵尸魔法师 | 反派僵尸 | EP.07 |
| 僵尸魔法师女朋友 | 反派僵尸 | EP.08 |
