<template>
  <div id="container"></div>
</template>


<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;
let location = ref(null);

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      location.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    (error) => {
      console.error("Error Code = " + error.code + " - " + error.message);
    }
  );
  console.log(location);
  
  AMapLoader.load({
    key: "71898eaa3134d6ab6aad47d1ffaceaae", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        // center: [location.longitude || 121.499,location.latitude || 31.239], // 初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<style lang=less  scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>