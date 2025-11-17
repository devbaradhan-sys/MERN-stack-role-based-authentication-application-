import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: env.PORT || 5173, // Use the environment variable or fallback to default
    },
    plugins: [react()]
  };
});