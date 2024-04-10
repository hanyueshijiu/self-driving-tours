<template>
  <div class="layoutBox">
    <HeaderVue />
    <div class="mainVue">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from "./components/header.vue";
</script>

<style lang="less" scoped>
.layoutBox {
  width: 100vw;
  height: 100vh;
  .mainVue {
    margin-top: 30vh;
    width: 100vw;
  }
}
</style>