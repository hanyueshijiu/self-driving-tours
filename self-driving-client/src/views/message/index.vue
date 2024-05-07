<template>
  <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="个人信息设置" sub-title="修改个人信息"
    @back="() => router.back()" />
  <div class="container">
    <div class="formBox">
      <a-form :model="formState" v-bind="layout" @finish="onFinish">
        <!-- 手机 -->
        <a-form-item name="phone" label="手机">
          <a-input v-if="isEdit" v-model:value="formState.phone" type="number" />
          <span v-else>{{ formState.phone }}</span>
        </a-form-item>

        <!-- 姓名 -->
        <a-form-item name="name" label="姓名">
          <a-input v-if="isEdit" v-model:value="formState.name" />
          <span v-else>{{ formState.name }}</span>
        </a-form-item>

        <!-- 昵称 -->
        <a-form-item name="nickname" label="昵称">
          <a-input v-if="isEdit" v-model:value="formState.nickname" />
          <span v-else>{{ formState.nickname }}</span>
        </a-form-item>

        <!-- 性别 -->
        <a-form-item name="sex" label="性别">
          <a-radio-group v-if="isEdit" v-model:value="formState.sex">
            <a-radio :value="'男'">男</a-radio>
            <a-radio :value="'女'">女</a-radio>
          </a-radio-group>
          <span v-else>{{ formState.sex }}</span>
        </a-form-item>

        <!-- 生日 -->
        <a-form-item name="birthday" label="生日">
          <a-date-picker v-if="isEdit" v-model:value="formState.birthday" />
          <span v-else>
            {{ formState.birthday ? dayjs(formState.birthday).format("YYYY-MM-DD") : "" }}
          </span>
        </a-form-item>

        <!-- 邮箱 -->
        <a-form-item name="email" label="邮箱">
          <a-input v-if="isEdit" v-model:value="formState.email" />
          <span v-else>{{ formState.email }}</span>
        </a-form-item>

        <!-- 介绍 -->
        <a-form-item name="introduction" label="介绍">
          <a-textarea v-if="isEdit" v-model:value="formState.introduction" />
          <span v-else>{{ formState.introduction }}</span>
        </a-form-item>

        <!-- 操作按钮 -->
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">{{
            isEdit ? "保存" : "修改"
          }}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/utils/http";
const router = useRouter();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

interface FormState {
  name: string;
  phone: string;
  nickname: string;
  sex: "男" | "女";
  birthday: any;
  email: string;
  introduction: string;
}

let formState = ref<FormState>({
  name: "",
  phone: "",
  nickname: "",
  sex: "男",
  birthday: null,
  email: "",
  introduction: "",
});

onMounted(() => {
  const info = JSON.parse(window.localStorage.getItem("userInfo"));
  formState.value = info;
  formState.value.birthday = dayjs(info.birthday, "YYYY-MM-DD");
});

let isEdit = ref<boolean>(false);

const onFinish = async (values: any) => {
  isEdit.value = !isEdit.value;

  if (isEdit.value) {
    if (formState.value.birthday) {
      formState.value.birthday = dayjs(values.birthday, "YYYY-MM-DD");
    }
    await http.post("/api/modifyInfo", values);
    const newInfo = await http.post("/api/getUserInfo", { phone: formState.value.phone });
    formState.value = newInfo.data[0][0];
    window.localStorage.setItem("userInfo", JSON.stringify(newInfo.data[0][0]));
  }
  try {
  } catch (error) {
    console.error(error, '错误信息')
  }
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
    width: 40vw;
    padding: 5rem;
  }
}
</style>
