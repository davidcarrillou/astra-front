import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite exponer en la red
    allowedHosts: [
      'admin.astracctv.com.mx', // 👈 agrega tu dominio aquí
    ]
  }
})
