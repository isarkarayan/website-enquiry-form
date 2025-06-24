import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ This fixes blank screen on deploy
  plugins: [react()],
})
