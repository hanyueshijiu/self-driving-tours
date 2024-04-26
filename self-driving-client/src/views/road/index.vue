<template>
  <div class="container">
    <div class="searchModule">
      <!-- 搜索模块 -->
      <div class="searchBox">
        <div class="title">定制你的专属路线</div>
        <div class="start">起点：<input v-model="startName" type="text"></div>
        <div class="start">目的地：<input v-model="endName" type="text"></div>
        <div class="btn"><a-button type="dashed" @click="change">搜索</a-button></div>
      </div>
      <!-- 地图模块(出行路线) -->
      <!-- startName, endName, dialogVisible -->
      <!-- <MapContainer v-if="dialogVisible" :startName="startName" :endName="endName" /> -->
      <!-- 热门推荐 -->
      <div class="hotRecommend">
        <h1>热门目的地</h1>
        <div class="hotList">
          <div class="hotCity" v-for="(item,index) in 8" :key="index">
            热门城市
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MapContainer from '@/components/MapContainer.vue';
const dialogVisible = ref<boolean>(false);

const startName = ref('');
const endName = ref('');

const change = () => {
  dialogVisible.value = !dialogVisible.value;
};


</script>

<style lang="less" scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .searchModule {
    width: 70vw;
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
      .hotList {
        display: flex;
        flex-wrap: wrap; /* 允许子项换行 */
        justify-content: space-around; /* 子项左对齐，可以根据需要调整 */
        gap: 20px; /* 子项之间的间距 */
        .hotCity {
          flex: 0 0 calc(25% - 20px); /* 每个子项占行宽的25%，减去间距 */
          height: 10rem; /* 高度，可以根据实际需要调整 */
          background-color: #fff; /* 背景色 */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), /* 主阴影 */
                      0 6px 20px rgba(0, 0, 0, 0.19); /* 深层阴影，增加立体感 */
          padding: 10px; /* 内部间距 */
          box-sizing: border-box; /* 包括padding和border在内的宽高计算方式 */
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
