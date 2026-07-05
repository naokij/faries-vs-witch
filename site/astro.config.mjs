import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      fs: {
        // 允许 Vite 从项目根目录 ../stories、../audio、../assets 读取文件
        allow: ['..'],
      },
    },
  },
});