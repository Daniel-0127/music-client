<template>

    <div id="text">

    </div>

</template>

<script>
export default {
  name: "loading_"
}
</script>

<style scoped>
#text {
  background-color: dodgerblue;
  width: 200px;
  height: 200px;
  margin: 200px auto;
  position: relative;
  box-shadow: inset;
  clip-path: polygon(
    0 0,
  100% 0,
  170px 100%,
  30px 100%
  );

}
#text::before{
  content: "";
  background-color: white;
  top: -150%;
  left: -50%;
  width: 200%;
  height: 200%;
  position: absolute;
  animation:loading  4s linear infinite;
  border-radius: 20% 60% 40% 40%;
}
@keyframes  loading{
   100%{
     transform: rotate(360deg);
   }
 }
</style>
