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
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item
          :name="['user', 'mobile']"
          label="手机号"
          :rules="[{ required: true}]"
        >
          <a-input v-model="formState.user.mobile" />
        </a-form-item>
        <a-form-item :name="['user', 'name']" label="真实姓名" :rules="[{ required: true}]">
          <a-input v-model="formState.user.name" />
        </a-form-item>
        <a-form-item :name="['user', 'nickname']" label="昵称">
          <a-input v-model="formState.user.nickname" />
        </a-form-item>
        <a-form-item
          :name="['user', 'email']"
          label="Email"
          :rules="[{ type: 'email' }]"
        >
          <a-input v-model="formState.user.email" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model="formState.user.sex">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :name="['user', 'age']"
          label="Age"
          :rules="[{ type: 'number', min: 0, max: 99 }]"
        >
          <a-input-number v-model="formState.user.age" />
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="Website">
          <a-input v-model="formState.user.website" />
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="Introduction">
          <a-textarea v-model="formState.user.introduction" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const formState = reactive({
  user: {
    mobile: null, // 手机号
    nickname: "", // 昵称
    name: "", // 真实姓名
    sex: "男", // 性别
    birthday: "", // 生日
    age: undefined,
    email: "",
    website: "",
    introduction: "",
  },
});
const onFinish = (values: any) => {
  console.log("Success:", values);
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
