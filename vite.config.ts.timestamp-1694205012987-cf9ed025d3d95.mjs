// vite.config.ts
import { defineConfig } from "file:///Users/garethjones/Sites/click-ui/node_modules/vite/dist/node/index.js";
import react from "file:///Users/garethjones/Sites/click-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path, { resolve } from "path";
import dts from "file:///Users/garethjones/Sites/click-ui/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/garethjones/Sites/click-ui";
var vite_config_default = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { displayName: false }]],
        env: {
          development: {
            plugins: [["babel-plugin-styled-components", { displayName: true }]]
          }
        }
      }
    }),
    dts({
      include: ["src/"],
      exclude: ["**/*.stories.ts", "**/*.stories.tsx", "**/*.test.ts", "**/*.test.tsx"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "click-ui",
      formats: ["es", "umd"],
      fileName: (format) => `click-ui.${format}.js`
    },
    rollupOptions: {
      // Add _all_ external dependencies here
      external: [
        "react",
        "react-dom",
        "styled-components",
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.test.ts",
        "**/*.test.tsx"
      ],
      output: {
        globals: {
          react: "React",
          "styled-components": "styled",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ2FyZXRoam9uZXMvU2l0ZXMvY2xpY2stdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9nYXJldGhqb25lcy9TaXRlcy9jbGljay11aS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ2FyZXRoam9uZXMvU2l0ZXMvY2xpY2stdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICBiYWJlbDoge1xuICAgICAgICBwbHVnaW5zOiBbW1wiYmFiZWwtcGx1Z2luLXN0eWxlZC1jb21wb25lbnRzXCIsIHsgZGlzcGxheU5hbWU6IGZhbHNlIH1dXSxcblxuICAgICAgICBlbnY6IHtcbiAgICAgICAgICBkZXZlbG9wbWVudDoge1xuICAgICAgICAgICAgcGx1Z2luczogW1tcImJhYmVsLXBsdWdpbi1zdHlsZWQtY29tcG9uZW50c1wiLCB7IGRpc3BsYXlOYW1lOiB0cnVlIH1dXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogW1wic3JjL1wiXSxcbiAgICAgIGV4Y2x1ZGU6IFtcIioqLyouc3Rvcmllcy50c1wiLCBcIioqLyouc3Rvcmllcy50c3hcIiwgXCIqKi8qLnRlc3QudHNcIiwgXCIqKi8qLnRlc3QudHN4XCJdLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJjbGljay11aVwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJ1bWRcIl0sXG4gICAgICBmaWxlTmFtZTogZm9ybWF0ID0+IGBjbGljay11aS4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gQWRkIF9hbGxfIGV4dGVybmFsIGRlcGVuZGVuY2llcyBoZXJlXG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICAgIFwic3R5bGVkLWNvbXBvbmVudHNcIixcbiAgICAgICAgXCIqKi8qLnN0b3JpZXMudHNcIixcbiAgICAgICAgXCIqKi8qLnN0b3JpZXMudHN4XCIsXG4gICAgICAgIFwiKiovKi50ZXN0LnRzXCIsXG4gICAgICAgIFwiKiovKi50ZXN0LnRzeFwiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInN0eWxlZC1jb21wb25lbnRzXCI6IFwic3R5bGVkXCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9CO0FBQ2xULE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVEsZUFBZTtBQUM5QixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0wsU0FBUyxDQUFDLENBQUMsa0NBQWtDLEVBQUUsYUFBYSxNQUFNLENBQUMsQ0FBQztBQUFBLFFBRXBFLEtBQUs7QUFBQSxVQUNILGFBQWE7QUFBQSxZQUNYLFNBQVMsQ0FBQyxDQUFDLGtDQUFrQyxFQUFFLGFBQWEsS0FBSyxDQUFDLENBQUM7QUFBQSxVQUNyRTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsTUFBTTtBQUFBLE1BQ2hCLFNBQVMsQ0FBQyxtQkFBbUIsb0JBQW9CLGdCQUFnQixlQUFlO0FBQUEsSUFDbEYsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsWUFBVSxZQUFZLE1BQU07QUFBQSxJQUN4QztBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLHFCQUFxQjtBQUFBLFVBQ3JCLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
