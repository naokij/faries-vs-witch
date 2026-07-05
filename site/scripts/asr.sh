#!/bin/bash
# 用 whisper 生成逐字时间戳
set -e
MP3="$1"
NAME=$(basename "$MP3" .mp3)
OUT="data/asr/${NAME}.json"
[ -f "$OUT" ] && { echo "已存在: $OUT"; exit 0; }
mkdir -p data/asr /tmp/whisper-tmp
whisper "$MP3" --language Chinese --model tiny --output_format json --output_dir /tmp/whisper-tmp --word_timestamps True >/dev/null 2>&1 || true
TMP="/tmp/whisper-tmp/${NAME}.json"
[ -f "$TMP" ] || { echo "❌ whisper 失败"; exit 1; }
python3 -c "
import json
with open('$TMP', 'r') as f: data = json.load(f)
words = []
for seg in data.get('segments', []):
    for w in seg.get('words', []):
        t = (w.get('text') or w.get('word') or '').strip()
        if t and 'start' in w and 'end' in w:
            words.append({'text': t, 'start': round(w['start'], 2), 'end': round(w['end'], 2)})
with open('$OUT', 'w') as f: json.dump(words, f, ensure_ascii=False, indent=2)
print(f'✅ {len(words)} 词 → $OUT')
"
