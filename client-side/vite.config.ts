import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
// https://vitejs.dev/config/

dotenv.config();
export default defineConfig({
  plugins: [react()],
});
