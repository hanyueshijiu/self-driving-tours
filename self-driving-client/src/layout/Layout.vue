<template>
  <div class="layoutBox">
    <HeaderVue />
    <div class="mainVue">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from './components/header.vue';
</script>

<style lang="less" scoped>
  .layoutBox {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .mainVue {
      flex: 1;
      width: 100vw;
    }
  }
</style>