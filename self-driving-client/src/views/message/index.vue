<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="个人信息设置"
      sub-title="修改个人信息"
      @back="() => router.back()"
    />
  <div class="container">
    <div class="formBox">
      <a-form :model="formState" v-bind="layout" name="nest-messages" @finish="onFinish">
        <!-- 手机 -->
        <a-form-item name="mobile" label="手机">
          <a-input
            v-if="isEdit"
            v-model:value="formState.mobile"
            type="number"
            maxlength="11"
          />
          <span v-else>{{ formState.mobile }}</span>
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
import type { Dayjs } from "dayjs";
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

interface FormState {
  name: string;
  mobile: number | null;
  nickname: string;
  sex: "男" | "女";
  birthday: null | Dayjs;
  email: string;
  introduction: string;
}

const formState = reactive<FormState>({
  name: "",
  mobile: null,
  nickname: "",
  sex: "男",
  birthday: null,
  email: "",
  introduction: "",
});

let isEdit = ref<boolean>(false);

const onFinish = (values: any) => {
  isEdit.value = !isEdit.value;

  if (isEdit.value) {
    return;
  }

  console.log("Success:", values);
};
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 80vh;
  background: linear-gradient(to bottom, #ADD8E6 0%, #FFFFFF 100%);
  display: flex;
  justify-content: center;
  .formBox {
    width: 40vw;
    padding: 5rem;
  }
}
</style>
