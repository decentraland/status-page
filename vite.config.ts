import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Keep the REACT_APP_* names already configured in Cloudflare Pages.
  envPrefix: ['VITE_', 'REACT_APP_'],
  css: {
    lightningcss: {
      // Semantic UI (via decentraland-ui) ships a few invalid selectors that
      // would otherwise abort CSS minification; skip them with a warning.
      errorRecovery: true
    }
  },
  build: {
    // Cloudflare Pages publishes the `build` directory.
    outDir: 'build'
  },
  server: {
    port: 3000
  }
})
