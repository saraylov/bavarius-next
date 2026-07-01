import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/bavarius-next/',
  plugins: [react()],
  server: { port: 3000, open: true }
})
