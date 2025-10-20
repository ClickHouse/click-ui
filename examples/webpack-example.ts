/**
 * Example: Using Click UI with Webpack
 */

import { Configuration } from 'webpack';
import { webpackClickUIConfig } from '@clickhouse/click-ui/config';

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Auto-discovers click-ui.config.ts in project root
    webpackClickUIConfig(),

    // Or with options:
    // webpackClickUIConfig({
    //   configPath: './click-ui.config.ts',
    //   cssOutput: 'theme-vars.css',
    //   verbose: true,
    // }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

export default config;
