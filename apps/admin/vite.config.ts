import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	esbuild: {
		logOverride: { "this-is-undefined-in-esm": "silent" },
	},
	server: {
		port: 3005,
	},
});
