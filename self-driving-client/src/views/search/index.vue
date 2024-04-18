<template>
  <div class="container">
    <div class="searchMain">
      <a-tabs v-model:activeKey="activeKey" size="large">
        <a-tab-pane key="1" tab="景点门票">
          <ProductionList  />
        </a-tab-pane>
        <a-tab-pane key="2" tab="酒店民宿">Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductionList from "../../components/productionList.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, watchEffect } from 'vue';
const route = useRoute();
const activeKey = ref('1');

watchEffect(() => {
  const params = route.query;
  console.log("路由参数变化:", params);
})

</script>

<style lang="less" scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .searchMain {
    width: 50vw;
    margin: 0 auto 3rem;
  }
}
</style>
