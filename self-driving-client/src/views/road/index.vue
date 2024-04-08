<template>
  <div class="container">
    目的地
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const travelRoad = ref([
  {
    img: "https://pic2.zhimg.com/80/v2-b29235f3d0ef6f978cbdd00c76b8090d_720w.webp",
    jumpUrl: "1",
    id: 0,
  },
  {
    img: "https://pic1.zhimg.com/80/v2-52bbb0d46d5c55c54d8e9066372e5d38_720w.webp",
    jumpUrl: "2",
    id: 1,
  },
  {
    img: "https://pic2.zhimg.com/80/v2-61f77d61553c94f518161f051eafc449_720w.webp",
    jumpUrl: "3",
    id: 2,
  },
]);
</script>

<style lang=less scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
}
</style>
