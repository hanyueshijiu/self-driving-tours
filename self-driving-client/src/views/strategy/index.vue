<template>
  <div class="createNote">
    <h1>发布旅游攻略</h1>
    <form @submit.prevent="submitNote">
      <div>
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div>
        <label for="content">内容：</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <div>
        <label for="file">上传图片</label>
        <input type="file" multiple id="file" @change="handleFileUpload">
      </div>
      <button type="submit">发布</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/http';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

const title = ref('');
const content = ref('');
const files = ref<FileList | null>(null);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  files.value = input.files;
}

const submitNote = async() => {
  if(!files.value) {
    message.error('请至少上传一张图片！');
    return;
  }

  const formData = new FormData();
  formData.append('title',title.value);
  formData.append('content',content.value);
  for(let i = 0; i < files.value.length; i++) {
    formData.append('images',files.value[i]);
  }

  try {
    await http.post('/note/uploadNote',formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    message.success('攻略发布成功！');
  } catch (error) {
    console.error('发布笔记失败：', error);
    message.error('发布笔记失败！')
  }
}




</script>

<style lang="less" scoped>

</style>