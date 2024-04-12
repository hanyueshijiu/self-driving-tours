<template>
  <div class="container">
    <div class="searchModule">
      <!-- 搜索模块 -->
      <div class="searchBox">
        <div class="title">定制你的专属路线</div>
        <div class="start">起点：<input type="text"></div>
        <div class="start">目的地：<input type="text"></div>
        <div class="btn"><a-button type="dashed" @click="change">搜索</a-button></div>
      </div>
      <!-- 地图模块(出行路线) -->
      <MapContainer v-if="show" />
      <!-- 热门推荐 -->
      <div class="hotRecommend">
        <h1>热门目的地</h1>
        <div class="hotList">
          <div class="hotCity"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MapContainer from '@/components/MapContainer.vue';
const show = ref<boolean>(false);
const change = () => {
  show.value = !show.value;
}


</script>

<style lang=less scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .searchModule {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
    .searchBox {
      width: 100%;
      height: 5rem;
      line-height: 5rem;
      border-radius: 5px;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
      display: flex;
      padding: 0 5rem;
      box-sizing: border-box;
      justify-content: space-around;
    }
    .hotRecommend {
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
