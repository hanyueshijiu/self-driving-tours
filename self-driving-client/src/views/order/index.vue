<template>
  <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="我的订单" sub-title="全部订单信息"
    @back="() => router.push('/')" />
  <div class="container">
    <div class="formBox">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'operation'">
            <a @click="showModal(record)">退票</a>
          </template>
        </template>
      </a-table>
    </div>
    <div>
      <a-modal v-model:open="open" title="友情提示" @ok="handleOk">
        <p>是否要取消当前订单？</p>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/utils/http";
import { message } from "ant-design-vue";
const router = useRouter();
import type { TableColumnsType } from "ant-design-vue";

const columns: TableColumnsType = [
  { title: "产品信息", width: 20, dataIndex: "name" },
  { title: "订单金额", width: 15, dataIndex: "price" },
  { title: "订单编号", width: 20, dataIndex: "orderNo" },
  { title: "订单状态", width: 20, dataIndex: "status" },
  {
    title: "操作",
    key: "operation",
    width: 20,
  },
];
let data = ref([]);
let chooseItem = ref({});
onMounted(async () => {
  const getUser = window.localStorage.getItem('userInfo');
  if (getUser) {
    let { user_id } = JSON.parse(getUser);
    await getOrder(user_id);
  }
})

const getOrder = async (user_id: number) => {
  const orders = await http.post('/api/getUserOrder', { user_id });
  let arr = orders.data.result;
  const transformedArray = arr.map(item => ({
    name: `${item.scenery_name}-${item.policy_name}`,
    price: parseFloat(item.price_sum),
    orderNo: item.scenery_order_id,
    status: item.order_status
  }));
  data.value = transformedArray;
}

const open = ref<boolean>(false);

const showModal = (record: any) => {
  chooseItem.value = record;
  if(record.status === '已支付') {
    open.value = true;
  }
};

const handleOk = async () => {
  console.log(chooseItem.value, 'chooseItem');
  let orderNo = chooseItem.value.orderNo;
  const result = await http.post('/api/cancelSceneryOrder', { orderNo });
  if (result.status === 200) {
    message.success(result.data.message);
    const getUser = window.localStorage.getItem('userInfo');
    if (getUser) {
      let { user_id } = JSON.parse(getUser);
      await getOrder(user_id);
    }
  } else {
    message.error('订单取消失败！');
  }
  open.value = false;
};
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 80vh;
  background: linear-gradient(to bottom, #add8e6 0%, #ffffff 100%);
  display: flex;
  justify-content: center;

  .formBox {
    width: 80vw;
    padding: 5rem;
  }
}
</style>
