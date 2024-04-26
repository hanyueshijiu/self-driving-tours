<template>
  <div class="container">
    <div class="searchMain">
      <a-tabs v-model:activeKey="activeKey" size="large">
        <a-tab-pane key="1" tab="景点门票">
          <ProductionList :list="sceneries" type="scenery"  />
        </a-tab-pane>
        <a-tab-pane key="2" tab="酒店民宿">
          <ProductionList :list="sceneries" type="hotel"  />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductionList from "../../components/productionList.vue";
import { useRoute } from "vue-router";
import { ref, watchEffect } from 'vue';
import http from '@/utils/http';
const route = useRoute();
const activeKey = ref('1');

const sceneries = ref([]);

watchEffect(async() => {
  const { keyword } = route.query;
  const currentSceneries = await http.post('/api/getSceneryByCity',{city: keyword});
  if(currentSceneries.data.length) {
    sceneries.value = currentSceneries.data
  } else {
    sceneries.value = []
  }
  console.log("景区列表:", currentSceneries);
})

</script>

<style lang="less" scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .searchMain {
    width: 60vw;
    margin: 0 auto 3rem;
  }
}
</style>
