import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      // Add _all_ external dependencies here
      external: ["react"],
    }
  }
})

