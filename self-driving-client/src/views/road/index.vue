<template>
  <div class="container">
    <div class="searchModule">
      <!-- 搜索模块 -->
      <div class="searchBox"></div>
      <!-- 地图模块 -->
      <MapContainer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MapContainer from '@/components/MapContainer.vue';
</script>

<style lang=less scoped>
.container {
  padding: 3rem 20rem;
  box-sizing: border-box;
  .searchModule {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    border: 1px solid #eee;
    border-radius: 15px;
  }
}
</style>
