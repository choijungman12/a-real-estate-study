import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// HashRouter + relative base => GitHub Pages safe
export default defineConfig({
  base: './',
  plugins: [react()],
})
