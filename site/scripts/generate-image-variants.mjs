#!/usr/bin/env node
/**
 * 派生 srcset 变体:把目录里每张 *.jpg 生成 {basename}-{width}.jpg 多档。
 * 幂等:输出文件 mtime >= 输入 mtime 且文件存在则跳过。
 * 运行: node generate-image-variants.mjs <dir> [--widths=200,400,800] [--quality=78]
 *   <dir> 默认为 site/public/assets/characters
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULT_DIR = join(__dirname, '..', 'public', 'assets', 'characters');

// 解析参数: <dir> [--widths=...] [--quality=...]
const args = process.argv.slice(2);
const TARGET_DIR = args.find((a) => !a.startsWith('--')) ?? DEFAULT_DIR;
const widthsArg = args.find((a) => a.startsWith('--widths='));
const qualityArg = args.find((a) => a.startsWith('--quality='));
const WIDTHS = widthsArg ? widthsArg.split('=')[1].split(',').map(Number) : [200, 400, 800];
const QUALITY = qualityArg ? Number(qualityArg.split('=')[1]) : 78;

async function main() {
  let entries;
  try {
    entries = await readdir(TARGET_DIR);
  } catch (err) {
    console.error(`❌ 无法读取目录: ${TARGET_DIR} (${err.message})`);
    process.exit(1);
  }

  const sources = entries.filter((f) => extname(f).toLowerCase() === '.jpg');
  // 排除已经是派生变体的文件: {name}-{width}.jpg
  const derivedPattern = /-\d+\.jpg$/i;
  const originals = sources.filter((f) => !derivedPattern.test(f));

  if (originals.length === 0) {
    console.log(`⚠️  目录中没有原图: ${TARGET_DIR}`);
    process.exit(0);
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of originals) {
    const inputPath = join(TARGET_DIR, file);
    const stem = basename(file, extname(file));
    let inputStat;
    try {
      inputStat = await stat(inputPath);
    } catch {
      continue;
    }

    for (const width of WIDTHS) {
      const outputName = `${stem}-${width}.jpg`;
      const outputPath = join(TARGET_DIR, outputName);

      try {
        const outStat = await stat(outputPath);
        if (outStat.mtimeMs >= inputStat.mtimeMs) {
          skipped += 1;
          continue;
        }
      } catch {
        // 文件不存在,继续生成
      }

      try {
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toFile(outputPath);
        generated += 1;
      } catch (err) {
        console.error(`  ⚠️  ${outputName} 生成失败: ${err.message}`);
        failed += 1;
      }
    }
  }

  console.log(
    `✅ 图片变体已生成: ${originals.length} 张原图 × ${WIDTHS.length} 档 (生成 ${generated},跳过 ${skipped}${failed ? `,失败 ${failed}` : ''})`,
  );
  if (failed > 0) process.exit(2);
}

main().catch((err) => {
  console.error(`❌ 脚本异常: ${err.message}`);
  process.exit(1);
});
