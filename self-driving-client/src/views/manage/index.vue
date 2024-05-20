<template>
  <div class="container">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
      <p style="text-align: center; cursor: pointer; color: rgb(35, 197, 230);" @click="goHome">返回自驾游旅游网</p>
    <div class="main">
      <StoreInfo v-if="current[0] === 'storeInfo'" />
      <ProductList v-if="current[0] === 'productList'" />
      <AddProduct  v-if="current[0] === 'addProduct'" />
    </div>
  </div>

</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter } from "vue-router";
import { MenuProps } from 'ant-design-vue';
import StoreInfo from './storeInfo.vue';
import ProductList from './productList.vue';
import AddProduct from './addProduct.vue';
const router = useRouter();
const current = ref<string[]>(['storeInfo']);
const items = ref<MenuProps['items']>([
  {
    key: 'storeInfo',
    icon: () => h(MailOutlined),
    label: '商铺信息',
    title: '商铺信息',
  },
  {
    key: 'productList',
    icon: () => h(AppstoreOutlined),
    label: '旅游资源列表',
    title: '旅游资源列表',
  },
  {
    key: 'addProduct',
    icon: () => h(SettingOutlined),
    label: '新增旅游资源',
    title: '新增旅游资源',
  },
]);

const goHome = () => {
  router.push('/');
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 80vh;
  background: linear-gradient(to bottom, #add8e6 0%, #ffffff 100%);
}
</style>