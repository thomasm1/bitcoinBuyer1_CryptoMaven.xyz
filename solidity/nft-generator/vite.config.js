import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// server.hmr.overlay // SET TO FALSE
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
