import vue from "@vitejs/plugin-vue";
import ssr from "vite-plugin-ssr/plugin";

export default {
  plugins: [
    vue(),
    ssr({
      prerender: true, // 启动编译预渲染
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "*": "/public",
      "#": "/renderer",
    },
  },
};
