<template>
  <div class="containerBox">
    <div class="container" @mouseleave="hideBox">
      <div class="main-box" @mouseover="showBox">{{isBoxVisible}}</div>
    </div>
    <div class="extra-box" v-show="isBoxVisible">1111</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isBoxVisible = ref(false); // 控制额外盒子显示的响应式数据

function showBox() {
  console.log('show');
  
  isBoxVisible.value = true; // 显示额外盒子
}

function hideBox() {
  console.log('hide');
  isBoxVisible.value = false; // 隐藏额外盒子
}
</script>

<style lang="less" scoped>
.containerBox {
  .container {
    position: relative;
    width: 200px; // 根据需要调整

    .main-box,
    .extra-box {
      padding: 10px;
      border: 1px solid #ccc;
      margin: 5px;
    }

    .extra-box {
      display: none; // 默认不显示
      position: absolute;
      top: 100%; // 紧贴主盒子下方
      left: 0;
      background-color: blue
    }
  }
}
</style>
