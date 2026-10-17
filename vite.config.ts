import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      'next/image': resolve(import.meta.dirname, './src/components/ui/next-image-shim.tsx'),
    },
  },
  define: {
    'process.env': {},
    process: { env: {} },
  },
})
