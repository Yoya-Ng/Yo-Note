import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url,
  base: config.site.base_path,
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true
  },
  integrations: [react(), vue(), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), AutoImport({
    imports: ["@components/common/Button.astro", "@shortcodes/Accordion", "@shortcodes/Notice", "@shortcodes/Youtube", "@shortcodes/Tabs", "@shortcodes/Tab"]
  }), mdx()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }], remarkMath],
    rehypePlugins: [[rehypeKatex, {}]],
    shikiConfig: {
      theme: "dark-plus", // https://shiki.style/themes
    },
    extendDefaultPlugins: true
  },
  // 本機開發：/api/* 轉到本機 Spring Boot（與正式環境 netlify.toml 的代理對應），
  // 讓登入 cookie 以同網域運作。後端 port 不同時設定 API_PROXY_TARGET
  vite: {
    server: {
      proxy: {
        "/api": {
          target: process.env.API_PROXY_TARGET || "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
});