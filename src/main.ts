import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/global.css';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import piniaPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPersistedstate);

app.use(createPinia())
app.use(router)
app.use(pinia)

app.mount('#app')
