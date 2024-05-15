<template>
  <div class="container">
    <div class="line">
      <p>景区名称：</p>
      <a-input type="text" v-model:value="storeInfo.sceneryName" v-if="isEdit" />
      <span v-else>{{storeInfo.sceneryName}}</span>
    </div>
    <div class="line">
      <p>景区地址：</p>
      <a-input type="text" v-model:value="storeInfo.address" v-if="isEdit" />
      <span v-else>{{storeInfo.address}}</span>
    </div>
    <div class="line">
      <p>特点描述：</p>
      <a-input type="text" v-model:value="storeInfo.facility" v-if="isEdit" />
      <span v-else>{{storeInfo.facility}}</span>
    </div>
    <div class="line">
      <p>景区星级：</p>
      <a-input type="text" v-model:value="storeInfo.star" v-if="isEdit" />
      <span v-else>{{storeInfo.star}}</span>
    </div>
    <div class="line">
      <p>景区特色：</p>
      <a-input type="text" v-model:value="storeInfo.evaluate" v-if="isEdit" />
      <span v-else>{{storeInfo.evaluate}}</span>
    </div>
    <div class="line">
      <p>开放时间：</p>
      <a-input type="text" v-model:value="storeInfo.openTime" v-if="isEdit" />
      <span v-else>{{storeInfo.openTime}}</span>
    </div>
    <div class="line">
      <p>景区设施：</p>
      <a-input type="text" v-model:value="storeInfo.facility" v-if="isEdit" />
      <span v-else>{{storeInfo.facility}}</span>
    </div>
    <div class="line">
      <p>建议游玩时间：</p>
      <a-input type="text" v-model:value="storeInfo.playTime" v-if="isEdit" />
      <span v-else>{{storeInfo.playTime}}</span>
    </div>
    <div class="line">
      <p>景区电话：</p>
      <a-input type="text" v-model:value="storeInfo.telephone" v-if="isEdit" />
      <span v-else>{{storeInfo.telephone}}</span>
    </div>
    <div class="btnBox">
      <a-button type="primary" size="large" @click="submit">{{isEdit ? '保存' : '修改'}}</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import http from '@/utils/http';


const isEdit = ref<boolean>(false);
let storeInfo = ref({});

onMounted(async() => {
  const getUser = window.localStorage.getItem('userInfo');
  if(getUser) {
    let { user_id } = JSON.parse(getUser);
    const store = await http.post('/api/getStoreInfo',{user_id});
    storeInfo.value = store.data[0];
    console.log(store.data[0],'storeInfo');
  }
});

const submit = () => {
  isEdit.value = !isEdit.value;
  if(isEdit.value) {
    console.log('修改')
    return;
  }
  console.log('保存')
}
</script>

<style lang="less" scoped>
.container {
  width: 50vw;
  height: 70vh;
  background: #eee;
  border-radius: 15px;
  .line {
    display: flex;
    align-items: center;
    p{
      width: 10vw;
      text-align: right;
    }
    span {
      margin-left: 1rem;
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