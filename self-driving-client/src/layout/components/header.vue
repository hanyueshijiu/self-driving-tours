<template>
  <div class="headerBox">
    <div class="mianModule">
      <div class="webTitle">自驾游旅游网</div>
      <div class="typeBox">
        <div
          :class="['typeItem', item.key == current ? 'selected' : '']"
          v-for="(item, index) in items"
          :key="index"
          @click="changeType(item)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="userInfo">
        <div class="preStatus">
          <div v-if="userName == ''">
            <a-button type="primary">登录</a-button><a-button>注册</a-button>
          </div>
          <div v-else style="color: #03a9f4;">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{`欢迎您，${userName}`}}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="goMessage">修改信息</a-menu-item>
                  <a-menu-item @click="loginout">退出登录</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="searchBox">
      <div class="search">
        <input type="text" v-model="inputValue" placeholder="请输入目的地/景点、酒店等" />
        <a-button type="primary" @click="goSearch">搜索</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
const router = useRouter();
const route = useRoute();
const current = ref<string>("/selfDriving/home");
const items = ref([
  {
    key: "/selfDriving/home",
    title: "首页推荐",
  },
  {
    key: "/selfDriving/road",
    title: "自驾推荐",
  },
  {
    key: "/selfDriving/scenery",
    title: "景点门票",
  },
  {
    key: "/selfDriving/hotel",
    title: "酒店民宿",
  }
]);
const userName = ref("寒月十九");
const changeType = (value:any) => {
  current.value = value.key;
  router.replace(value.key);
};
const goMessage = () => {
  router.push('/message');
}

const loginout = () => {
  router.push('/login');
}

let inputValue = ref('');

const goSearch = () => {
  console.log(route.path,'path');
  let searchValue = inputValue.value;
  
  router.push({name: 'search', query: { keyword: searchValue}});
}
</script>

<style lang="less" scoped>
.headerBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 18vh;
  z-index: 100;
  border: 1px solid #eee;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 
              0px 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
  border-radius: 5px;
  background-image: url(https://pic3.zhimg.com/80/v2-8d43b0b1b27c66362f4b085f8668e3b6_720w.webp);
  /* 使背景图片居中 */
  background-position: 60%;

  /* 背景图片不重复 */
  background-repeat: no-repeat;

  /* 背景图片覆盖整个容器，且保持图片的宽高比 */
  background-size: cover;
  .mianModule {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 5rem;
    .webTitle {
      background: linear-gradient(90deg, #03a9f4, #3f51b5, #9c27b0, #e91e63);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 3rem;
    }
    .typeBox {
      display: flex;
      .typeItem {
        height: 3rem;
        line-height: 3rem;
        margin-left: 2rem;
        padding: 0 2rem;
        box-sizing: border-box;
        border-radius: 5px;
        cursor: pointer;
      }
      .typeItem:hover {
        background: #03a9f4;
      }
      .selected {
        background: #03a9f4;
        color: #fff;
      }
    }
    .userInfo {
      cursor: pointer;
    }
  }
  .searchBox {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    .search {
      width: 30rem;
      height: 2rem;
      display: flex;
      input {
        width: 25rem;
        height: 2rem;
        border-radius: 5px;
        background-color: transparent; /* 去除背景 */
        border: 0.5px solid #fff; /* 去除边框 */
        outline: none; /* 去除聚焦时的轮廓线 */
        padding: 0; /* 去除内边距 */
        margin: 0; /* 去除外边距 */
      }
    }
  }
}
</style>