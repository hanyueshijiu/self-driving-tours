<template>
  <div id="container"></div>
  <div id="route-panel"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { AMap } from "@amap/amap-jsapi-loader"; // 引入类型定义

const map = ref<AMap.Map | null>(null);

onMounted(() => {
  AMapLoader.load({
    key: "71898eaa3134d6ab6aad47d1ffaceaae",
    version: "2.0",
    plugins: ["AMap.Geocoder", "AMap.Driving"] // 确保插件名正确
  })
  .then((AMap) => {
    map.value = new AMap.Map("container", {
      center: [116.397428, 39.90923],
      zoom: 13
    });
    console.log("AMap and plugins loaded successfully"); // 确认地图和插件加载成功
    searchRoute("北京", "上海");
  })
  .catch((e) => {
    console.error("Failed to load AMap or plugins: ", e); // 提供详细的错误信息
  });
});

function searchRoute(startPoint: string, endPoint: string) {
  if (!map.value) {
    console.error("Map is not initialized");
    return;
  }

  const geocoder = new AMap.Geocoder();
  const driving = new AMap.Driving({
    map: map.value,
    panel: "route-panel"
  });

  Promise.all([geocoder.getLocation(startPoint), geocoder.getLocation(endPoint)])
    .then((results) => {
      const [startGeo, endGeo] = results;
      if (startGeo.geocodes.length && endGeo.geocodes.length) {
        const startPos = startGeo.geocodes[0].location;
        const endPos = endGeo.geocodes[0].location;
        driving.search(
          { type: "start", location: startPos },
          { type: "end", location: endPos }
        );
        console.log("Route search initiated successfully"); // 确认路线搜索启动成功
      } else {
        console.error("Geocoding failed for one of the locations");
      }
    })
    .catch((error) => {
      console.error("Geocoding error:", error);
    });
}
</script>


<style lang="less" scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
#route-panel {
  margin-top: 20px;
}
</style>
