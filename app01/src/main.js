import './assets/main.css'
import router from './router'
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'



const app = createApp(App)
    .use(store)
    .use(router)

app.mount('#app')

