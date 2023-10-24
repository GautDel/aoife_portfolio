import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 5174,
      open: true,
      cors: {
          origin: true,
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true
      }
  },
  plugins: [react()],
})
 
