import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [ react() ],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // https: false,
    watch: {
        usePolling: true
    }}
})
