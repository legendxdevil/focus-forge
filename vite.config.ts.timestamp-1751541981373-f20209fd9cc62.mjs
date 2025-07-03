// vite.config.ts
import { defineConfig } from "file:///C:/Users/Nand%20Kishore%20Soni/Downloads/FocusForge/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Nand%20Kishore%20Soni/Downloads/FocusForge/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/Nand%20Kishore%20Soni/Downloads/FocusForge/node_modules/vite-plugin-pwa/dist/index.js";

// manifest.json
var manifest_default = {
  name: "FocusForge",
  short_name: "FocusForge",
  description: "A productivity app that works offline: Pomodoro, Notes, Tasks, and more.",
  start_url: ".",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#FF9933",
  icons: [
    {
      src: "logo.svg",
      sizes: "192x192",
      type: "image/svg+xml"
    },
    {
      src: "logo.svg",
      sizes: "512x512",
      type: "image/svg+xml"
    }
  ]
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/Users/Nand%20Kishore%20Soni/Downloads/FocusForge/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: manifest_default,
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      }
    })
  ],
  resolve: {
    alias: {
      "@": new URL("./src", __vite_injected_original_import_meta_url).pathname
    }
  },
  server: {
    port: 3e3,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE5hbmQgS2lzaG9yZSBTb25pXFxcXERvd25sb2Fkc1xcXFxGb2N1c0ZvcmdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxOYW5kIEtpc2hvcmUgU29uaVxcXFxEb3dubG9hZHNcXFxcRm9jdXNGb3JnZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTmFuZCUyMEtpc2hvcmUlMjBTb25pL0Rvd25sb2Fkcy9Gb2N1c0ZvcmdlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgbWFuaWZlc3QsXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Z30nXVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkucGF0aG5hbWUsXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBvcGVuOiB0cnVlLFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgXG4gICAgICB9XG4gICAgfVxuICB9XG59KSIsICJ7XG4gIFwibmFtZVwiOiBcIkZvY3VzRm9yZ2VcIixcbiAgXCJzaG9ydF9uYW1lXCI6IFwiRm9jdXNGb3JnZVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBwcm9kdWN0aXZpdHkgYXBwIHRoYXQgd29ya3Mgb2ZmbGluZTogUG9tb2Rvcm8sIE5vdGVzLCBUYXNrcywgYW5kIG1vcmUuXCIsXG4gIFwic3RhcnRfdXJsXCI6IFwiLlwiLFxuICBcImRpc3BsYXlcIjogXCJzdGFuZGFsb25lXCIsXG4gIFwiYmFja2dyb3VuZF9jb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgXCJ0aGVtZV9jb2xvclwiOiBcIiNGRjk5MzNcIixcbiAgXCJpY29uc1wiOiBbXG4gICAge1xuICAgICAgXCJzcmNcIjogXCJsb2dvLnN2Z1wiLFxuICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcbiAgICAgIFwidHlwZVwiOiBcImltYWdlL3N2Zyt4bWxcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJzcmNcIjogXCJsb2dvLnN2Z1wiLFxuICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcbiAgICAgIFwidHlwZVwiOiBcImltYWdlL3N2Zyt4bWxcIlxuICAgIH1cbiAgXVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VSxTQUFTLG9CQUFvQjtBQUMxVyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlOzs7QUNGeEI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFlBQWM7QUFBQSxFQUNkLGFBQWU7QUFBQSxFQUNmLFdBQWE7QUFBQSxFQUNiLFNBQVc7QUFBQSxFQUNYLGtCQUFvQjtBQUFBLEVBQ3BCLGFBQWU7QUFBQSxFQUNmLE9BQVM7QUFBQSxJQUNQO0FBQUEsTUFDRSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGOzs7QURwQitNLElBQU0sMkNBQTJDO0FBS2hRLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsTUFDakQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLElBQUksSUFBSSxTQUFTLHdDQUFlLEVBQUU7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
