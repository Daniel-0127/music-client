// 全局组件注册




import HomeMain from "@/components/Home/HomeMain.vue";
import MyLoading from "@/components/Common/MyLoading.vue";
import LoadSvg from "@/components/Common/LoadSvg.vue";

export default {
    install(Vue) {
        Vue.component(HomeMain.name,HomeMain)
        Vue.component(MyLoading.name,MyLoading)
        Vue.component(LoadSvg.name,LoadSvg)
    }
}
