import { createApp } from 'vue'
import App from '@/app/App.vue'
import { router, store } from '@/app/providers'

export const app = createApp(App).use(router).use(store)

app.mount('#app')
