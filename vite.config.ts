import { defineConfig } from 'vite' // 👈 之前就是少了这一行！
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true, // 允许 Zeabur 域名访问
  }
})