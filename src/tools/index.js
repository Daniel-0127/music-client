// 全局组件注册




import HomeMain from "@/components/Home/HomeMain.vue";

export default {
    install(Vue) {
        Vue.component(HomeMain.name,HomeMain)
    }
}
