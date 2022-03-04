import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/Mind'),
      name: 'vue3-image-vue',
      fileName: (format) => `build.${format}.ts`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }

})
