// 构建时给资源 URL 加内容 hash 查询参数
// 这样图片/音频可以长期强缓存，内容变了 hash 变 -> URL 变 -> 浏览器自动请求新文件
import hashes from './asset-hashes.json';

/**
 * 给资源 URL 加内容 hash
 * @param url  资源路径，如 '/assets/covers/1-冰火仙子.jpg'
 * @returns    带 hash 的 URL，如 '/assets/covers/1-冰火仙子.jpg?h=a3f2b1'
 */
export function assetUrl(url: string): string {
  const h = (hashes as Record<string, string>)[url];
  return h ? `${url}?h=${h}` : url;
}

/**
 * 给 srcset 字符串里的每个 URL 加 hash
 * srcset 格式: "/assets/x-200.jpg 200w, /assets/x-400.jpg 400w, /assets/x.jpg 2048w"
 */
export function assetSrcset(srcset: string): string {
  return srcset.split(', ').map(entry => {
    const [url, descriptor] = entry.split(' ');
    return `${assetUrl(url)} ${descriptor}`;
  }).join(', ');
}
