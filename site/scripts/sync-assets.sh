#!/bin/bash
# 同步项目根目录的资源到 site/public/
# 运行: cd site && bash scripts/sync-assets.sh
set -e

# 项目根 = site 的父目录
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PUBLIC="$ROOT/site/public"

rm -rf "$PUBLIC/assets" "$PUBLIC/audio"
cp -R "$ROOT/assets" "$PUBLIC/assets"
mkdir -p "$PUBLIC/audio" && cp "$ROOT/audio"/*.mp3 "$PUBLIC/audio/" 2>/dev/null || true

# 派生人物图 srcset 变体 (200/400/800)
node "$(dirname "$0")/generate-image-variants.mjs" "$PUBLIC/assets/characters"

# 派生封面图 srcset 变体 (400/800/1200)
node "$(dirname "$0")/generate-image-variants.mjs" "$PUBLIC/assets/covers" --widths=400,800,1200 --quality=80

echo "✅ 同步完成"
echo "  图片: $(find "$PUBLIC/assets" -type f | wc -l | xargs) 个"
echo "  音频: $(ls "$PUBLIC/audio"/*.mp3 2>/dev/null | wc -l | xargs) 个"

# 生成资源内容 hash 映射表（用于构建时给 URL 加 ?h=xxxx 实现缓存 bust）
node "$(dirname "$0")/generate-asset-hashes.mjs"