<template>
  <div class="container">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="个人信息设置"
      sub-title="修改个人信息"
      @back="() => null"
    />
    <div class="formBox">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="手机号"
          name="mobile"
          :rules="[{ required: true, message: '请输入正确的手机号!' }]"
        >
          <a-input v-model:value="formState.mobile" />
        </a-form-item>

        <a-form-item
          label="真实姓名"
          name="name"
          :rules="[{ required: true, message: '请输入真实姓名!' }]"
        >
          <a-input-password v-model:value="formState.name" />
        </a-form-item>

        <a-form-item name="sex" label="性别">
          <a-radio-group v-model:value="formState.sex">
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
interface FormState {
  mobile: number;
  name: string;
  nickname: string;
  sex: "男" | "女";
  birthday: date;
  address: string;
}

const formState = reactive<FormState>({
  mobile: null,
  name: "",
  nickname: "",
  sex: "男",
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style lang="less" scoped>
.container {
  width: 40vw;
  height: 80vh;
  margin: 2rem auto;
  .formBox {
    padding: 5rem;
  }
}
</style>
