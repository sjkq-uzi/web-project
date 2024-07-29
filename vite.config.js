import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { resolve } from "path";
import requireTransform from "vite-plugin-require-transform";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    requireTransform({
      fileRegex: /.js$|.vue$/,
    }),
  ],
  assetsInclude: ["**/*.glb"],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [],
    },
  },
  server: {
    port: 8081,
    open: true,
    cors: true,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
});
