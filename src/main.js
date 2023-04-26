import {createApp} from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import index from "@/tools/index.js"

import axios from "axios";
import VueAxios from "vue-axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from "@/router/router";
import tool from "@/utils/tool";
import store from "@/store";





const app = createApp(App)
app.use(store)
app.use(router)
app.use(index)
app.use(tool)
app.use(VueAxios, axios)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')


//配置接口地址
axios.defaults.baseURL = "http://localhost:8063"

//允许跨域
axios.defaults.withCredentials = true
