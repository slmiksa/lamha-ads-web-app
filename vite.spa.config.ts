import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        site: resolve(projectRoot, "index.html"),
        adminpanel: resolve(projectRoot, "adminpanel/index.html"),
      },
      output: {
        manualChunks: (id) => {
          if (id.includes("AdminWorkspace") || id.includes("ContentEditor")) return "admin-editor";
          return undefined;
        },
      },
    },
  },
});