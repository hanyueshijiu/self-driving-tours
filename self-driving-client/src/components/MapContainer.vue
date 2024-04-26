<template>
  <div class="map">
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, toRefs } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = defineProps({
  dialogVisible: Boolean,
  startName: String,
  endName: String,
});
const { dialogVisible } = toRefs(props);

const map = ref(null);
const driving = ref(null);

onMounted(() => {
  initMap();
});

// 监听对话框可见性变化
watch(dialogVisible, (newVal) => {
  if (newVal) {
    initMap();
  }
});

window._AMapSecurityConfig = {
  securityJsCode: "ce311e8f516e6cc651b80f0fbd9e43a2",
};

//进行地图初始化
function initMap() {
  AMapLoader.load({
    key: "71898eaa3134d6ab6aad47d1ffaceaae", // 申请好的Web端开发者Key，首次调用 load 时必填
    plugins: ["AMap.AutoComplete", "AMap.PlaceSearch", "AMap.Driving", "AMap.DragRoute"],
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    Loca: {
      version: "2.0.0",
    },
  })
    .then((AMap) => {
      map.value = new AMap.Map("container", {
        //设置地图容器id
        plugins: [
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
          "AMap.Driving",
          "AMap.DragRoute",
        ],
        zoom: 10, //地图显示的缩放级别
      });

      const goView = () => {
        // eslint-disable-next-line no-undef
        driving.value = new AMap.Driving({
          map: map.value,
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
          panel: "panel",
        });
        // 根据起终点经纬度规划驾车导航路线
        driving.value?.search(
          [
            { keyword: props.startName, city: "全国" },
            { keyword: props.endName, city: "全国" },
          ],
          function (status: any, result: any) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === "complete") {
              console.log("绘制驾车路线完成", result);
            } else {
              console.log("获取驾车数据失败：" + result);
            }
          }
        );
      };
      goView(); // 获取线路规划
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<style lang="less" scoped>
.map {
  position: relative;
  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 800px;
  }
}

#panel {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  max-height: 90%;
  overflow-y: auto;
  top: 0;
  right: 10px;
  width: 250px;
}
</style>
