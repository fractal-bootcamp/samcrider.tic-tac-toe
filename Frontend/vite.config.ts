import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3004",
          changeOrigin: true,
        },
        "/socket.io": {
          target: "http://localhost:3004",
          changeOrigin: true,
          ws: true,
        },
      },
    },
  });
};
