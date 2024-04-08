<template>
  <div class="headerBox">
    <div class="titleModule">
      <div class="webTitle">自驾游旅游网</div>
      <div class="search">
        <input type="text" placeholder="请输入目的地/景点、酒店等">
        <a-button type="primary">搜索</a-button>
      </div>
      <div class="userInfo">登录 | 注册</div>
    </div>
    <div class="mianModule">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import {
  ThunderboltFilled,
  FireFilled,
  HomeFilled,
  CameraFilled,
  FlagFilled,
} from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
const current = ref<string[]>(["home"]);
const items = ref<MenuProps["items"]>([
  {
    key: "home",
    icon: () => h(ThunderboltFilled),
    label: "首页推荐",
    title: "首页推荐",
  },
  {
    key: "planning",
    icon: () => h(FlagFilled),
    label: "自驾推荐",
    title: "自驾推荐",
  },
  {
    key: "Recommended",
    icon: () => h(FireFilled),
    label: "景点门票",
    title: "景点门票",
  },
  {
    key: "hotel",
    icon: () => h(HomeFilled),
    label: "酒店民宿",
    title: "酒店民宿",
  },
  {
    key: "evaluate",
    icon: () => h(CameraFilled),
    label: "反馈评价",
    title: "反馈评价",
  },
]);

const clickFn = (value) => {
  console.log(value);
};
</script>

<style lang="less" scoped>
.headerBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 20vh;
  background-image: url(https://pic3.zhimg.com/80/v2-8d43b0b1b27c66362f4b085f8668e3b6_720w.webp);
  /* 使背景图片居中 */
  background-position: 60%;

  /* 背景图片不重复 */
  background-repeat: no-repeat;

  /* 背景图片覆盖整个容器，且保持图片的宽高比 */
  background-size: cover;
  .titleModule {
    display: flex;
    padding: 2rem 10rem 1rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    .webTitle {
      background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 2rem;
    }
    .search {
      width: 25rem;
      height: 2rem;
      display: flex;
      input {
        width: 25rem;
        height: 2rem;
        border-radius: 5px;
        background-color: transparent; /* 去除背景 */
        border: 1px solid #fff; /* 去除边框 */
        outline: none; /* 去除聚焦时的轮廓线 */
        padding: 0; /* 去除内边距 */
        margin: 0; /* 去除外边距 */
      }
    }
  }
  .mianModule {
    display: flex;
    justify-content: space-around;
  }
}
</style>