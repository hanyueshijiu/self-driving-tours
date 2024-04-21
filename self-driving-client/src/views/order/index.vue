<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="我的订单"
    sub-title="全部订单信息"
    @back="() => router.push('/')"
  />
  <div class="container">
    <div class="formBox">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>退票</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/utils/http";
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

interface DataItem {
  name: string;
  price: number;
  orderNo: string;
  status: string;
}

const data: DataItem[] = [
  {
    name: "寒山寺",
    price: 20,
    orderNo: "ORD-20230421-12345",
    status: "已出票"
  },
  {
    name: "拙政园",
    price: 80,
    orderNo: "ORD-20230421-12346",
    status: "已出票"
  },
  {
    name: "留园",
    price: 55,
    orderNo: "ORD-20230421-12347",
    status: "已出票"
  },
  {
    name: "尚湖风景区",
    price: 60,
    orderNo: "ORD-20230421-12348",
    status: "已出票"
  },
];
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
