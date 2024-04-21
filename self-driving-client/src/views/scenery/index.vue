<template>
  <div class="containerBox">
    <div class="sceneryBox">
      <div class="titleModule">
        <div class="title">热门目的地</div>
        <div class="hotCities">
          <div :class="['city', item.city == current ? 'current' : '']" v-for="(item, index) in hotCity" :key="index">
            {{ item.city }}
          </div>
        </div>
        <div class="more">查看更多{{current}}景点</div>
      </div>
      <div class="mainMpdule">
        <div class="kindType">
          <!-- <div class="kind" v-for="(item, index) in 8" :key="index">
            园林古镇
          </div> -->
        </div>
        <div class="recommendSecnery">
          <div class="scenery" v-for="(item, index) in currentScenery.slice(0,6)" :key="index" @click="goDetail(item.sid)">
            <img :src="item.imgUrl" alt="">
            <span class="name">{{item.sceneryName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import http from '@/utils/http';

const router = useRouter();

const current = ref('苏州');

const currentScenery = ref([]);

const hotCity = ref([
  { city: '南通' },
  { city: '无锡' },
  { city: '苏州' },
  { city: '常州' },
  { city: '上海' },
  { city: '泰州' },
  { city: '嘉兴' },
])

onMounted(async() => {
  const currentSceneries = await http.post('/api/getSceneryByCity',{city: current.value});
  if(currentSceneries.data.length) {
    currentScenery.value = currentSceneries.data
  };
});

const goDetail = (sid:string) => {
  router.push({name: 'detail', query: {sid}})
}
</script>

<style lang="less" scoped>
.containerBox {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .sceneryBox {
    width: 70vw;
    margin: 0 auto;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    .titleModule {
      height: 5vh;
      line-height: 5vh;
      display: flex;
      padding: 0 2rem;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12),
        0px 1px 2px rgba(0, 0, 0, 0.24);
      .title {
        font-size: 1.8rem;
        margin-right: 2rem;
        width: 10rem;
        text-align: center;
      }
      .hotCities {
        width: 60%;
        display: flex;
        cursor: pointer;
        .city {
          margin: 0 .1rem;
          padding: 0 1rem;
        }
        .city:hover {
          background: #03a9f4;
          border-radius: 5px;
          border: 1px solid #fff;
          color: #fff;
        }
        .current {
          background: #03a9f4;
          border-radius: 5px;
          border: 1px solid #fff;
          color: #fff;
        }
      }
      .more {
        margin-left: auto;
        cursor: pointer;
      }
    }
    .mainMpdule {
      display: flex;
      .kindType {
        width: 20rem;
        height: 40rem;
        border: 1px solid #03a9f4;
        background-image: url(https://img1.40017.cn/cn/s/2016/pc/scenery/index/new/rmmddLeftImg1.gif);
        /* 背景图片不重复 */
        background-repeat: no-repeat;

        /* 背景图片覆盖整个容器，且保持图片的宽高比 */
        background-size: cover;
        display: flex;
        padding: 5rem 2rem;
        box-sizing: border-box;
        flex-wrap: wrap; /* 允许子项换行 */
        justify-content: flex-start; /* 子项左对齐，可以根据需要调整 */
        gap: 5px; /* 子项之间的间距 */
        .kind {
          text-align: center;
          height: 5rem;
        }
      }
      .recommendSecnery {
        width: calc(100% - 20rem);
        height: 40rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        .scenery {
          flex: 0 0 calc(50% - 10px);
          height: calc(40rem / 3 - 10px);
          background-color: #fff; /* 背景色 */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
            /* 主阴影 */ 0 6px 20px rgba(0, 0, 0, 0.19); /* 深层阴影，增加立体感 */
          padding: 10px; /* 内部间距 */
          box-sizing: border-box; /* 包括padding和border在内的宽高计算方式 */
          position: relative;
          cursor: pointer;
          img{
            width: 100%;
          }
          .name {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            color: red;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
