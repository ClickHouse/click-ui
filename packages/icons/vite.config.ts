import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, 'src').replace(/\\/g, '/');

const createEntryFileNames = (ext: 'js' | 'cjs') => {
  return (chunkInfo: { name: string }) => {
    const parts = chunkInfo.name.split('/');
    if (parts.length >= 2) {
      const fileName = parts[parts.length - 1];
      const dirName = parts[parts.length - 2];
      if (fileName === dirName) {
        parts[parts.length - 1] = 'index';
        return `${parts.join('/')}.${ext}`;
      }
    }
    return `${chunkInfo.name}.${ext}`;
  };
};

export default defineConfig({
  publicDir: false,
  plugins: [
    dts({
      outDir: 'dist/types',
      include: ['src/**/*'],
    }),
  ],
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
  build: {
    target: 'esnext',
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: {
        index: path.resolve(srcDir, 'index.ts'),
        'Icons/index': path.resolve(srcDir, 'Icons/index.ts'),
        'Logos/index': path.resolve(srcDir, 'Logos/index.ts'),
        'Flags/index': path.resolve(srcDir, 'Flags/index.ts'),
        'Payments/index': path.resolve(srcDir, 'Payments/index.ts'),
      },
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: createEntryFileNames('js'),
          chunkFileNames: '[name].js',
          interop: 'auto',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: createEntryFileNames('cjs'),
          chunkFileNames: '[name].cjs',
          interop: 'auto',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
  },
});
