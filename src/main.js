import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

createApp(App)
    .use(mdiVue, {
        icons: mdijs
    })
    .use(store)
    .mount('#app')
