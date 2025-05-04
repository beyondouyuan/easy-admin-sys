import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './styles/index.scss'

import App from './App.vue'
import router from './router'
import i18n from './locales'

import GlobalComponents from './components/global'
import { setupPermission } from './permission'
import pinia from './stores'

setupPermission()

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(i18n)
app.use(GlobalComponents) // 全局组件
app.use(router)

app.mount('#app')
