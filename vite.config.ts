import { BuildOptions, defineConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

const srcDir = path.resolve(__dirname, 'src').replace(/\\/g, '/');

const createEntryFileNames = (ext: 'js' | 'cjs') => {
  return (chunkInfo: { name: string }) => {
    const parts = chunkInfo.name.split('/');
    if (parts.length >= 2) {
      const fileName = parts[parts.length - 1];
      const dirName = parts[parts.length - 2];
      // NOTE: Solve import name redundancy for better API
      // by preferring default build name as index
      // e.g. Button/Button -> Button
      if (fileName === dirName) {
        parts[parts.length - 1] = 'index';
        return `${parts.join('/')}.${ext}`;
      }
    }
    return `${chunkInfo.name}.${ext}`;
  };
};

const buildOptions: BuildOptions = {
  target: 'esnext',
  emptyOutDir: true,
  // WARNING: Do not minify unbundled builds
  // Consumer will perform a final minification of app
  // Minifiers often modify var names and collapse logic
  // which makes static analysis challenging
  minify: false,
  lib: {
    entry: {
      index: path.resolve(srcDir, 'index.ts'),
      'hooks/index': path.resolve(srcDir, 'hooks/index.ts'),
    },
  },
  rollupOptions: {
    output: [
      {
        format: 'es',
        dir: 'dist/esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: createEntryFileNames('js'),
        chunkFileNames: '[name].js',
        banner: chunk => (chunk.name === 'index' ? `'use client';` : ''),
        interop: 'auto',
      },
      {
        format: 'cjs',
        dir: 'dist/cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: createEntryFileNames('cjs'),
        chunkFileNames: '[name].cjs',
        banner: chunk => (chunk.name === 'index' ? `'use client';` : ''),
        interop: 'auto',
        exports: 'named',
      },
    ],
  },
  sourcemap: true,
};

const viteConfig = defineConfig({
  publicDir: false,
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: false }]],

        env: {
          development: {
            plugins: [['babel-plugin-styled-components', { displayName: true }]],
          },
        },
      },
    }),
    dts({
      outDir: 'dist/types',
      include: ['src/**/*'],
      exclude: [
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.mdx',
        'src/App.tsx',
        'src/main.tsx',
        'src/examples/**',
        'src/assets/**',
        'src/stories/**',
      ],
    }),
    externalizeDeps({
      deps: true,
      devDeps: false,
      nodeBuiltins: true,
      optionalDeps: true,
      peerDeps: true,
      useFile: path.join(process.cwd(), 'package.json'),
    }),
    tsconfigPaths(),
    // WARNING: Keep the visualizer last
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: './tmp/stats.html',
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
  build: buildOptions,
});

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'jsdom',
    // TODO: Note that currently, the pw visual regression tests
    // are kept separate, see ./tests
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build', 'storybook-static', '.storybook'],
    globals: true,
    watch: false,
    setupFiles: ['@testing-library/jest-dom', './setupTests.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
