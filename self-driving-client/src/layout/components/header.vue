<template>
  <div class="headerBox">
    <div class="titleModule">
      <div class="webTitle">自驾游旅游网</div>
      <div class="search">
        <a-input-search
          placeholder="input search text"
          enter-button
        />
      </div>
      <div class="userInfo">登录 | 注册</div>
    </div>
    <div class="mianModule">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="clickFn" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { ThunderboltFilled, FireFilled, HomeFilled, CameraFilled, FlagFilled } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
const current = ref<string[]>(['home']);
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(ThunderboltFilled),
    label: '首页',
    title: '首页',
  },
  {
    key: 'planning',
    icon: () => h(FlagFilled),
    label: '旅游路径推荐',
    title: '旅游路径推荐',
  },
  {
    key: 'Recommended',
    icon: () => h(FireFilled),
    label: '景点推荐',
    title: '景点推荐',
  },
  {
    key: 'hotel',
    icon: () => h(HomeFilled),
    label: '酒店信息',
    title: '酒店信息',
  },
  {
    key: 'evaluate',
    icon: () => h(CameraFilled),
    label: '反馈与评价',
    title: '反馈与评价',
  },
]);   

const clickFn = (value) => {
  console.log(value);
}
</script>

<style lang="less" scoped>
.headerBox {
  width: 100vw;
  .titleModule {
    display: flex;
    padding: 2rem 5rem 1rem;
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
    }
  }
  .mianModule {
    display: flex;
    justify-content: space-around;
  }
}
</style>