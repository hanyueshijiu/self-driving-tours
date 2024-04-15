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
  background: linear-gradient(to bottom, #ADD8E6 0%, #FFFFFF 100%);
  .mainVue {
    margin-top: 18vh;
    width: 100vw;
  }
}
</style>