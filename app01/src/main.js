import './assets/main.css'
import router from './router'
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'



const app = createApp(App)
    .use(store)
    .use(router)

// Sprawdź czy użytkownik jest już zalogowany przy starcie aplikacji
store.dispatch('User/FETCH_CURRENT_USER');

app.mount('#app')

