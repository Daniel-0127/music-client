<template>
  <div></div>
</template>

<script>
export default {
  name: "MyEmpty",
  created() {
    const id = this.$route.query.id;
    if(id==='1'){
      this.$router.push({path: '/HomeMain/HomeSearch'})
    }else if(id==='2'){
      this.$router.push({path: '/HomeMain/HomeUser'})
    }else if(id==='3'){
      this.$router.push({path:'/HomeMain/DetailSong'})
    }else {
      this.$router.push({path:this.$route.query.id})
    }

  }
}
</script>

<style scoped>

</style>
