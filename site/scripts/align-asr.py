#!/usr/bin/env python3
"""
对齐 ASR 输出的繁简混合文本到故事原文的简体文本。

策略：
1. 用 OpenCC 将 ASR 输出从繁简混合转简体
2. 用 difflib 的 SequenceMatcher 找最佳对齐
3. 对每个原文汉字，分配 ASR 的时间戳（取最近 ASR 字符的中点）
4. 标点符号（原文里有但 ASR 可能没有的）继承前后字的时间戳
"""
import sys
import os
import json
import re
from difflib import SequenceMatcher
import opencc

# 保留标点
def is_punct(c):
    return c in '，。！？、；：""''（）《》…—\n\r \t'

# 1. 繁简转换
cc_t2s = opencc.OpenCC('t2s')  # 繁体 → 简体

# 2. 读取原文
md_path = sys.argv[1]
with open(md_path, 'r') as f:
    md = f.read()
# 提取正文（去掉标题和 --- 后内容）
text = re.sub(r'^# .+\n', '', md)
text = text.split('---')[0]
# 保留原文每个字（含标点）
ref_chars = [c for c in text if not c.isspace() or c in ' \n']

# 3. 读取 ASR
asr_path = sys.argv[2]
with open(asr_path, 'r') as f:
    asr_words = json.load(f)
asr_chars = []
for w in asr_words:
    text_t = w['text']
    text_s = cc_t2s.convert(text_t)  # 繁→简
    for c in text_s:
        asr_chars.append({'char': c, 'start': w['start'], 'end': w['end']})

# 4. 对齐：用 difflib 把 ref_chars 和 asr_chars 字符串配对
ref_str = ''.join(ref_chars)
asr_str = ''.join(c['char'] for c in asr_chars)

# 简化：先把 asr 里的非汉字、非标点过滤掉，避免误对齐
def is_match_char(c):
    return '\u4e00' <= c <= '\u9fff' or c.isalnum() or is_punct(c)

# 构造匹配字符串：只取两边匹配字符
sm = SequenceMatcher(None, ref_str, asr_str, autojunk=False)

# 5. 输出：每个 ref_char 找最近的 asr 字符的时间戳
result = []
asr_idx = 0
for blk in sm.get_opcodes():
    tag, i1, i2, j1, j2 = blk
    if tag == 'equal':
        # ref[i1:i2] = asr[j1:j2] 完全匹配
        for k in range(i2 - i1):
            ref_pos = i1 + k
            asr_pos = j1 + k
            if ref_pos < len(ref_chars) and asr_pos < len(asr_chars):
                result.append({
                    'char': ref_chars[ref_pos],
                    'start': asr_chars[asr_pos]['start'],
                    'end': asr_chars[asr_pos]['end'],
                })
    elif tag == 'replace':
        # 不完全匹配：尝试就近匹配
        # 用 j1 处的 ASR 时间戳填充所有 ref 字符
        if j2 > j1:
            base_time = (asr_chars[j1]['start'], asr_chars[j2 - 1]['end'])
        else:
            base_time = (0, 0)
        for k in range(i2 - i1):
            ref_pos = i1 + k
            if ref_pos < len(ref_chars):
                result.append({
                    'char': ref_chars[ref_pos],
                    'start': base_time[0],
                    'end': base_time[1],
                })
    elif tag == 'delete':
        # 原文有、ASR 没有（通常是标点，ASR 不识别标点）
        # 保留字符：标点零时长（紧贴前字，不会被高亮二分查找命中）；
        # 漏识别的汉字用前后时间戳插值，仍可被高亮。
        prev_end = result[-1]['end'] if result else 0
        next_start = asr_chars[j1]['start'] if j1 < len(asr_chars) else prev_end
        for k in range(i2 - i1):
            ref_pos = i1 + k
            if ref_pos < len(ref_chars):
                ch = ref_chars[ref_pos]
                if is_punct(ch):
                    result.append({'char': ch, 'start': prev_end, 'end': prev_end})
                else:
                    result.append({'char': ch, 'start': prev_end, 'end': next_start})
    elif tag == 'insert':
        # 原文有，ASR 没有 — 用前后 ASR 时间戳插值
        if result and j1 < len(asr_chars):
            prev_end = result[-1]['end'] if result else 0
            next_start = asr_chars[j1]['start'] if j1 < len(asr_chars) else prev_end
            for k in range(i2 - i1):
                ref_pos = i1 + k
                if ref_pos < len(ref_chars):
                    result.append({
                        'char': ref_chars[ref_pos],
                        'start': prev_end,
                        'end': next_start,
                    })
        else:
            for k in range(i2 - i1):
                ref_pos = i1 + k
                if ref_pos < len(ref_chars):
                    result.append({'char': ref_chars[ref_pos], 'start': 0, 'end': 0})

# 6. 输出：去掉空白字符项
out = [r for r in result if r['char'].strip()]

# 输出 JSON（compact，仅 char/start/end）
with open(sys.argv[3], 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, separators=(',', ':'))

# 报告
print(f"原文 chars: {len(ref_chars)}, 对齐输出: {len(out)}")
print(f"覆盖率: {len(out) / len(ref_chars) * 100:.1f}%")
print(f"前 50 字: {''.join(r['char'] for r in out[:50])}")
