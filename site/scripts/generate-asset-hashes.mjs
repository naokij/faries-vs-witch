#!/usr/bin/env node
// 为 public/ 下的图片和音频生成内容 hash 映射表
// 输出: src/data/asset-hashes.json  →  { "/assets/covers/1-冰火仙子.jpg": "a3f2b1", ... }
// 构建时 assetUrl() 读取此文件给 URL 加 ?h=xxxx 查询参数

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname; // site/scripts/
const SITE = join(ROOT, '..'); // site/
const PUBLIC = join(SITE, 'public');
const OUT = join(SITE, 'src', 'data', 'asset-hashes.json');

const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.mp3', '.ogg'];

function walk(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (EXTS.some(ext => name.toLowerCase().endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const hashes = {};
for (const file of walk(PUBLIC)) {
  const url = '/' + relative(PUBLIC, file).split(/[\\/]/).join('/');
  const buf = readFileSync(file);
  const hash = createHash('md5').update(buf).digest('hex').slice(0, 8);
  hashes[url] = hash;
}

mkdirSync(join(SITE, 'src', 'data'), { recursive: true });
writeFileSync(OUT, JSON.stringify(hashes, null, 2) + '\n');

console.log(`✅ 生成 ${Object.keys(hashes).length} 个资源 hash → src/data/asset-hashes.json`);
