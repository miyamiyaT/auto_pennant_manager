import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // これを true に設定することで、0.0.0.0 にバインド
    port: 3002, // 開発サーバーのポート
  },
})
