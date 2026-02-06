import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures the path is correct only when building for the live site
  base: process.env.NODE_ENV === 'production' ? '/logo-resizer/' : '/',
})