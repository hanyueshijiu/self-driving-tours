<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name', 'policyId', 'policyName', 'inventory', 'price'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">保存</a-typography-link>
            <a-popconfirm title="确定取消修改?" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">修改</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';

const columns = [
  {
    title: '景点名称',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: '票型id',
    dataIndex: 'policyId',
    width: '15%',
  },
  {
    title: '票型名称',
    dataIndex: 'policyName',
    width: '25%',
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    width: '15%',
  },
  {
    title: '单价',
    dataIndex: 'price',
    width: '15%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
interface DataItem {
  key: number;
  name: string;
  policyId: number;
  policyName: string;
  inventory: number;
  price: number;
}
const data: DataItem[] = [{
  key: 47677,
  name: '寒山寺',
  policyId: 1,
  policyName: '成人票',
  inventory: 800,
  price: 20

},
{
  key: 47677,
  name: '寒山寺',
  policyId: 2,
  policyName: '优待票',
  inventory: 800,
  price: 0

}];

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
