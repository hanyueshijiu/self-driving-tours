<template>
  <div class="container">
    <h1>新增商品信息</h1>
    <div class="line">
      <p>票型ID：</p>
      <a-input type="text" v-model:value="productInfo.productId" />
    </div>
    <div class="line">
      <p>票型名称：</p>
      <a-input type="text" v-model:value="productInfo.productName" />
    </div>
    <div class="line">
      <p>库存：</p>
      <a-input type="text" v-model:value="productInfo.inventory" />
    </div>
    <div class="line">
      <p>单价：</p>
      <a-input type="text" v-model:value="productInfo.price" />
    </div>
    <div class="btnBox">
      <a-button type="primary" size="large" @click="addProduct">新增商品</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const productInfo = reactive({
  productId: null,
  productName: '',
  inventory: null,
  price: null
})

const addProduct = () => {
  message.success('商品添加成功！');
  console.log('====================================');
  console.log(productInfo,'productInfo');
  console.log('====================================');
  router.push('/manage')
}
</script>

<style lang="less" scoped>
.container {
  width: 50vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eee;
  border-radius: 15px;
  .line {
    display: flex;
    align-items: center;
    p{
      width: 10vw;
      text-align: right;
    }
    input {
      width: 30vw;
    }
  }
  .btnBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>