<template>
  <div class="container">
    <div class="detailMain">
      订单详情页
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, watchEffect } from 'vue';
const route = useRoute();

watchEffect(() => {
  const params = route.query;
  console.log("路由参数变化:", params);
})

</script>

<style lang="less" scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .detailMain {
    width: 50vw;
    margin: 0 auto 3rem;
  }
}
</style>
