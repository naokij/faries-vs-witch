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

echo "✅ 同步完成"
echo "  图片: $(find "$PUBLIC/assets" -type f | wc -l | xargs) 个"
echo "  音频: $(ls "$PUBLIC/audio"/*.mp3 2>/dev/null | wc -l | xargs) 个"