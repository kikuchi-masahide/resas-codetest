import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    root: ".",
    publicDir: "../public",
    build: {
        outDir: "./dist",
        assetsDir: "./assets",
        copyPublicDir: true,
        rollupOptions: {
            input: {
                main: "./index.html",
            },
        },
    },
});
