<template>
<div>
  <h2 style="margin: 40px">搜索如下</h2>
  <TitleList :my-data="data_"></TitleList>
</div>
</template>

<script>
import TitleList from "@/components/Common/TitleList.vue";
import store from "@/store";
export default {
  name: "HomeSearch",
  components: {TitleList},
  data(){
    return{
      data_:[],
    }
  },
  created() {

    this.data_ = store.state.SearchList
    console.log(store.state.SearchList)
  }
}
</script>

<style scoped>
* {
  font-family: "微软雅黑", Arial, sans-serif;
}
</style>
