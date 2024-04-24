import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist', // Ensure this points to where you want your build files to go
    rollupOptions: {
      input: 'public/index.html'
    }
  }
})
