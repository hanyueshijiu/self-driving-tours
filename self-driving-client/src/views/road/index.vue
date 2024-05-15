<template>
  <div class="container">
    <div class="searchModule">
      <!-- 搜索模块 -->
      <div class="searchBox">
        <div class="title">定制你的专属路线</div>
        <div class="start">起点：<input v-model="startName" type="text" /></div>
        <div class="start">目的地：<input v-model="endName" type="text" /></div>
        <div class="btn"><a-button type="dashed" @click="change">搜索</a-button></div>
      </div>
      <!-- 地图模块(出行路线) -->
      <!-- startName, endName, dialogVisible -->
      <MapContainer v-if="dialogVisible" :startName="startName" :endName="endName" />
      <!-- 热门推荐 -->
      <div class="hotRecommend">
        <h1>热门目的地</h1>
        <div class="hotList">
          <div class="hotCity" v-for="(item, index) in hotDestination" :key="index" @click="goSearch(item.city)">
            <img :src="item.imgUrl" /><span>{{ item.city }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MapContainer from "@/components/MapContainer.vue";
import { useRouter } from "vue-router";
const dialogVisible = ref<boolean>(false);
const router = useRouter();
// 起点
const startName = ref("");
// 终点
const endName = ref("");

// 热门目的地
const hotDestination = ref([
  {
    city: "云南",
    imgUrl: "https://pic4.zhimg.com/v2-7b5cb1365840d17bf0119cff0c010f16_r.jpg",
  },
  {
    city: "广东",
    imgUrl:
      "https://ts1.cn.mm.bing.net/th/id/R-C.2af88c48141f93386101ba8a27b816ea?rik=ZCR%2bJGkjdL%2fEBg&riu=http%3a%2f%2fnews.southcn.com%2fgd%2fcontent%2fimages%2fattachement%2fjpg%2fsite4%2f20210201%2f6c4b908da87821819e720b.jpg&ehk=mZ9U90POhGLwSPH1u0AWLGwvaR5H9hm9eLPHgYuMVuA%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    city: "四川",
    imgUrl:
      "https://pic2.zhimg.com/v2-8eeb8328d0014e3fb39aa84a80694b4e_1440w.jpg?source=172ae18b",
  },
  {
    city: "北京",
    imgUrl:
      "https://ts1.cn.mm.bing.net/th/id/R-C.2c1206b22e75189326e6450f48243690?rik=Z%2bk4J%2baoFAG53A&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fphotoblog%2f1406%2f11%2fc1%2f35177815_35177815_1402478810900.jpg&ehk=I1CieOZ38UXTdUqmS2vq%2bX16vyjn63qTFR%2fvoUBYA%2fk%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    city: "浙江",
    imgUrl:
      "https://ts1.cn.mm.bing.net/th/id/R-C.25cec41acb91dcfadef6666042bca32e?rik=qj2CIRGLmBRJpA&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20200815ac%2f278%2fw721h357%2f20200815%2f78a9-ixvrvsn7814434.jpg&ehk=eXIEHBQCSHn5vY6lkKkRwSOydQ%2fY%2fYFP9i1B%2fh5PWew%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
  },
  {
    city: "山东",
    imgUrl:
      "https://ts1.cn.mm.bing.net/th/id/R-C.008479632b6f01251f015043f8b11a5d?rik=5%2b0MOVnt5sGucQ&riu=http%3a%2f%2fimages.china.cn%2fsite1000%2f2018-07%2f20%2f46dc1732-182b-4981-9eeb-fda2e52ea9c5.jpg&ehk=tDe2uyk%2fAjRvLsRjEVooayEHf5OwHeuFiYILO98YL%2bc%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    city: "内蒙古",
    imgUrl:
      "https://ts1.cn.mm.bing.net/th/id/R-C.84131ed99411d2a103c5d4a91bc5c530?rik=7iAhYeJg4IuZxA&riu=http%3a%2f%2fimg0.dili360.com%2fga%2fM00%2f00%2f89%2fwKgBy1Q2bnqAaxVJAAFp9UyTJ_Y669.jpg%40!rw9&ehk=QK2ybBIgNAWzZODhlC%2b%2f5jv46k0YY6XtuoizpRw39p4%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
  },
  {
    city: "陕西",
    imgUrl:
      "https://ts1.cn.mm.bing.net/th/id/R-C.38f0f18ee44eb7b200ec4a308d8edc0c?rik=WeaxlNj7gr3DYA&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fphotoblog%2f1104%2f25%2fc2%2f7431963_7431963_1303697001000.jpg&ehk=wQxash2iAFQIr6eylf0Sqc9aI1Pn9sWAPXAtbCTJ3RU%3d&risl=&pid=ImgRaw&r=0",
  },
]);

// 路线规划组件
const change = () => {
  dialogVisible.value = !dialogVisible.value;
};

const goSearch = (keyword: string) => {
  router.push({ name: "search", query: { keyword: keyword } });
}
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
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
            /* 主阴影 */ 0 6px 20px rgba(0, 0, 0, 0.19); /* 深层阴影，增加立体感 */
          padding: 10px; /* 内部间距 */
          box-sizing: border-box; /* 包括padding和border在内的宽高计算方式 */
          border-radius: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
