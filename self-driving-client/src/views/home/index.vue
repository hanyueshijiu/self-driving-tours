<template>
  <a-row>
    <a-col :span="12">
      <a-carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </a-carousel>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup></script>

<style scoped>
:deep(.slick-slide) {
  text-align: center;
  width: 30rem;
  height: 20rem;
  line-height: 20rem;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}</style>
