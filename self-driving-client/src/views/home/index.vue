<template>
  <div class="container">
    <!-- 旅游路线推荐 -->
    <div class="travelRecommend">
      <div class="title">热门旅游攻略</div>
      <div class="recommendList" v-if="recommendNote.length">
        <div class="recommendItem" v-for="(item, index) in recommendNote" :key="index">
          <div class="unevenItem" @click="chooseNote(item)">
            <img :src="item.image[0]" alt="" />
            <div class="textBox">
              <div class="recommendTitle">{{ item.title }}</div>
              <!-- <div class="recommendDesc">
                <span>{{ item.content }}</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 攻略详情 -->
      <div class="travelModel" v-if="open" @click="() => open = false">
        <div class="modelBox" @click.stop>
          <h1 style="text-align: center;">{{chooseItem.title}}</h1>
          <p>{{chooseItem.content}}</p>
          <img :src="item" alt="" v-for="(item,index) in chooseItem.image" :key="index">
        </div>
      </div>
    </div>
    <!-- 景点推荐 -->
    <div class="sceneryRecommend">
      <div class="title">当季热门景点</div>
      <div class="secneryBox" v-for="(item, index) in recommendScenery" :key="index">
        <div class="sceneryImg">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="sceneryInfo">
          <div class="sceneryName">
            <span>{{ item.sceneryName }}</span>
            <span class="icon" v-if="item.star">{{ item.star }}景区</span>
          </div>
          <div class="sceneryDesc">“{{ item.evaluate }}”</div>
          <div class="sceneryOtherInfo">
            景点地址：<span>{{ item.address }}</span>
          </div>
          <div class="sceneryOtherInfo">
            开放时间：<span>{{ item.openTime }}</span>
          </div>
          <div class="sceneryOtherInfo">
            景区设施：<span>{{ item.facility }}</span>
          </div>
          <div class="more"><a-button type="primary" @click="goDetail(item.sid)">查看更多</a-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/utils/http";

const router = useRouter();
const open = ref<boolean>(false);

// 热门旅游攻略
const recommendNote = ref([]);
// 热门景点
const recommendScenery = ref([]);

const chooseItem = ref({});

onMounted(async () => {
  await Promise.all([getHotNotes(), getCurHotScenery()]);
});

// 获取热门旅游攻略
const getHotNotes = async () => {
  try {
    const notes = await http.get("/note/getAll");
    if (notes.data && notes.data.length) {
      recommendNote.value = notes.data.slice(0, 3);
    }
  } catch (error) {
    console.error('获取热门旅游攻略失败：', error);
  }
};

// 获取当季热门景点
const getCurHotScenery = async () => {
  try {
    const sceneries = await http.post('/api/getSceneryByCity', { city: '苏州' });
    if (sceneries.data.length) {
      recommendScenery.value = sceneries.data.slice(0, 3)
    }
  } catch (error) {
    console.error('获取当季热门景点失败：', error);
  }
}

// 跳转详情页
const goDetail = (sid: string) => {
  router.push({ name: "detail", query: { sid } });
};

// 打开攻略详情
const chooseNote = (item) => {
  console.log('====================================');
  console.log(item,'item');
  console.log('====================================');
  chooseItem.value = item;
  open.value = true;
};
</script>

<style lang="less" scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;

  .travelRecommend {
    width: 70vw;
    height: 58vh;
    margin: 0 auto 5rem;

    .title {
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      font-size: 2rem;
      border-bottom: 2px solid #03a9f4;
    }

    .recommendList {
      width: 70vw;
      height: calc(58vh - 5rem);
      margin-top: 3rem;
      display: flex;
      justify-content: space-around;

      .recommendItem {
        width: 20vw;
        height: calc(58vh - 8rem);
        display: flex;
        justify-content: space-around;
        border: 1px solid #eee;
        border-radius: 15px;

        img {
          width: 20vw;
          height: 25vh;
          border-radius: 15px;
        }

        .textBox {
          padding: 1rem;
          box-sizing: border-box;
          height: calc(58vh - 21rem);
          overflow: hidden;

          .recommendTitle {
            font-size: 1.2rem;
          }

          .recommendDesc {
            margin-top: 1.5rem;
            font-size: 0.8rem;
            overflow: hidden;
          }
        }
      }
    }

    .travelModel {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      border: 1px solid #eee;
      border-radius: 15px;
      background: #111111;
      z-index: 9999;
      display: flex;
      justify-content: center;
      .modelBox {
        width: 70vw;
        height: 70vh;
        margin: 20vh auto;
        background: #fff;
        overflow-y: scroll;
      }
    }
  }

  .sceneryRecommend {
    width: 70vw;
    height: 40vh;
    margin: 0 auto;

    .title {
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      font-size: 2rem;
      border-bottom: 2px solid #03a9f4;
    }

    .secneryBox {
      width: 70vw;
      height: 50vh;
      padding: 2rem 2rem;
      box-sizing: border-box;
      display: flex;

      .sceneryImg {
        img {
          width: 30vw;
          height: 30vh;
        }
      }

      .sceneryInfo {
        padding: .5rem 1rem;
        box-sizing: border-box;

        .sceneryName {
          font-size: 2rem;
          font-weight: bold;

          .icon {
            font-size: 1rem;
            color: rgb(238, 145, 63);
          }
        }

        .sceneryDesc {
          margin-top: 1rem;
          font-size: 1.2rem;
          color: #03a9f4;
        }

        .sceneryOtherInfo {
          margin-top: 1rem;
          color: #000;

          span {
            color: #03a9f4;
          }
        }

        .more {
          margin-top: 1rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
