import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'


// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      })
    ],

    server: {
      host: true,
      port: env.VITE_APP_PORT || 7777,
      hmr: {
        clientPort: env.VITE_APP_PORT || 7777
      },
      strictPort: true,
      watch: {
        usePolling: true
      }
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
