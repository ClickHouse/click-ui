import type { Plugin } from 'vite';
interface ClickUIPluginOptions {
    configPath?: string;
    cssOutput?: string;
}
export declare function clickUI(options?: ClickUIPluginOptions): Plugin;
export {};
