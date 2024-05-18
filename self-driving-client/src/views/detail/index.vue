<template>
  <div class="container">
    <div class="detailMain" v-if="detailInfo">
      <div class="mainInfo">
        <img :src="detailInfo.imgUrl" alt="" />
        <div class="detailInfo">
          <div class="line">
            <span class="title">{{ detailInfo.sceneryName }}</span><span class="star" v-if="detailInfo.star">{{ detailInfo.star }}景区
            </span><span class="type">{{ detailInfo.special }}</span>
          </div>
          <div class="line">
            <span class="special">{{ detailInfo.evaluate }}</span>
          </div>
          <div class="line">
            景点地址：<span class="text">{{ detailInfo.address }}</span>
          </div>
          <div class="line">
            开放时间：<span class="openTime">{{ detailInfo.openTime }}</span>
          </div>
          <div class="line">
            景区设施：<span class="text">{{ detailInfo.facility }}</span>
          </div>
          <div class="line" v-if="detailInfo.playTime">建议游玩时间：<span class="text">{{ detailInfo.playTime }}</span></div>
          <div class="buy">
            <div class="price" v-if="detailInfo.price">￥{{ detailInfo.price }}</div>
            <div class="btn" @click="showDrawer">立即抢购</div>
          </div>
        </div>
      </div>
      <div class="evaluate">
        <h2>游客评论</h2>
        <a-list v-if="comments.length" :data-source="comments" :header="`${comments.length} 条评论`"
          item-layout="horizontal">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-comment :author="item.nick_name"
                avatar="https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                :content="item.comment_content" :datetime="item.publish_time" />
            </a-list-item>
          </template>
        </a-list>
        <a-comment>
          <template #avatar>
            <a-avatar
              src="https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="" />
          </template>
          <template #content>
            <a-form-item>
              <a-textarea v-model:value="commentValue" :rows="4" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                提交评论
              </a-button>
            </a-form-item>
          </template>
        </a-comment>
      </div>
    </div>
    <a-drawer v-model:open="open" :title="detailInfo.sceneryName" width="50vw" :closable="false"
      :footer-style="{ textAlign: 'right' }" @close="onClose">
      <h4>请选择票型</h4>
      <div>
        <a-select ref="select" v-model:value="value1" style="width: 120px" @change="handleChange">
          <a-select-option v-for="(item, index) in stockInfo" :key="index" :value="item.scenery_policy_id">{{
            item.scenery_policy_name }}</a-select-option>
        </a-select>
      </div>
      <h4>请填写出游人信息</h4>

      <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">
        <a-space v-for="(user, index) in dynamicValidateForm.users" :key="user.id"
          style="display: flex; margin-bottom: 8px" align="baseline">
          <a-form-item :name="['users', index, 'naem']">
            <a-input v-model:value="user.name" placeholder="出游人姓名" />
          </a-form-item>
          <a-form-item :name="['users', index, 'idNo']">
            <a-input v-model:value="user.idNo" placeholder="出游人证件号" />
          </a-form-item>
          <MinusCircleOutlined @click="removeUser(user)" />
        </a-space>
        <a-form-item>
          <a-button type="dashed" block @click="addUser">
            <PlusOutlined />
            添加出游人信息
          </a-button>
        </a-form-item>
      </a-form>

      <a-input v-model:value="phone" placeholder="请输入订单联系手机号" />

      <template #footer>
        ￥{{ dynamicValidateForm.users.length ? finally_price : 0 }}
        <a-button style="margin-right: 8px" @click="onClose">取消 </a-button>
        <a-button type="primary" @click="submitForm">立即支付</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import http from '@/utils/http';

const router = useRouter();

const finally_price = ref();

dayjs.extend(relativeTime);
const route = useRoute();
interface User {
  name: string;
  idNo: string;
  id: number;
}
type Comment = Record<string, string>;

const dynamicValidateForm = reactive<{ users: User[] }>({
  users: [],
});

const removeUser = (item: User) => {
  const index = dynamicValidateForm.users.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.users.splice(index, 1);
  }
};
const addUser = () => {
  dynamicValidateForm.users.push({
    name: "",
    idNo: "",
    id: Date.now(),
  });
};

const onFinish = (values: any) => {
  // finally_price.value = 
  console.log("Received values of form:", values);
  console.log("dynamicValidateForm.users:", dynamicValidateForm.users);
};

const open = ref<boolean>(false);

const phone = ref();

const value1 = ref();

const stockInfo = ref([]);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

const submitForm = async () => {
  if (dynamicValidateForm.users.length <= 1 && !dynamicValidateForm.users[0].name) {
    message.info("至少需要一个出游人信息！");
    return;
  }
  const getUser = window.localStorage.getItem('userInfo');
  const { scenery_policy_id, sid, scenery_name, scenery_policy_name, scenery_price, stock } = stockInfo.value.find((item) => item.scenery_policy_id == value1.value) || {};
  if (getUser) {
    let { user_id } = JSON.parse(getUser);
    let params = {
      user_id,
      sid,
      scenery_name,
      scenery_policy_id,
      policy_name: scenery_policy_name,
      unit_price: +scenery_price,
      price_sum: (+scenery_price * dynamicValidateForm.users.length),
      order_status: '已支付',
      phone: phone.value || '',
      create_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      num: dynamicValidateForm.users.length,
      traveler_name: dynamicValidateForm.users[0].name || '',
      traveler_id_number: dynamicValidateForm.users[0].idNo || '',
    }
    // console.log(params, 'params');
    const result = await http.post('/api/submitSceneryOrder', params);
    if (result.status === 200) {
      message.success({
        content: () => `购票成功，共花费￥${finally_price.value}`,
        style: {
          marginTop: "20vh",
        },
      });
    }
  }
  onClose();
};

// 评论列表
const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const commentValue = ref<string>("");

// 提交 评论
const handleSubmit = async () => {
  if (!commentValue.value) {
    return;
  }
  const getUser = window.localStorage.getItem('userInfo');
  if (getUser) {
    let { nickname, user_id } = JSON.parse(getUser);
    const { sid } = route.query;
    let params = {
      user_id,
      nick_name: nickname,
      sid,
      comment_content: commentValue.value,
      publish_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }
    submitting.value = true;
    const addComment = await http.post('/api/publishComment', params);
    if (addComment && addComment.status === 200) {
      commentValue.value = '';
      message.success(addComment.data.message);
      getComment(sid);
    } else {
      message.error('提交评论失败！');
    }
    submitting.value = false;

  } else {
    router.push('/login');
  }
};

const detailInfo = ref({});

onMounted(async () => {
  const { sid } = route.query;
  const sceneryInfo = await http.post('/api/getSceneryBySid', { sid });
  await getComment(sid);
  await getStock(sid);
  detailInfo.value = sceneryInfo.data[0];
});

const getComment = async (sid: any) => {
  const sceneryComment = await http.post('/api/getCommentBySid', { sid });
  if (sceneryComment.data.length) {
    comments.value = sceneryComment.data;
  }
}

const getStock = async (sid: any) => {
  const getStcokInfo = await http.post('/api/getSceneryStock', { sid });
  stockInfo.value = getStcokInfo.data
}

const handleChange = () => {
  finally_price.value = (+stockInfo.value.find((item) => item.scenery_policy_id == value1.value)?.scenery_price)
};
</script>

<style lang="less" scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;

  .detailMain {
    width: 60vw;
    margin: 0 auto 3rem;
    padding: 2rem;
    box-sizing: border-box;
    border: 1px solid #fff;
    background: #fff;

    .mainInfo {
      display: flex;

      img {
        width: 30vw;
        height: auto;
      }

      .detailInfo {
        flex: 1;
        padding: 1rem;
        box-sizing: border-box;
        border: 1px solid #ccc;
        /* 为了可视化边界 */
        word-wrap: break-word;
        /* 允许单词在达到边界时断行 */
        overflow-wrap: break-word;

        /* 确保在单词无法完整放入容器时能断行 */
        .line {
          margin-top: 1rem;

          .title {
            font-size: 2rem;
            font-weight: bold;
          }

          .star {
            margin-left: 1rem;
            color: #ff5704;
          }

          .special {
            font-size: 1.2rem;
            color: #03a9f4;
          }

          .type {
            padding: 0.2rem;
            border: 1px solid #eee;
            background: #eee;
            border-radius: 5px;
          }

          .text {
            color: #03a9f4;
          }
        }

        .buy {
          margin-top: 2rem;
          display: flex;
          height: 3rem;
          line-height: 3rem;

          .price {
            color: #ff5704;
            font-size: 2rem;
          }

          .btn {
            margin-left: 2rem;
            width: 15rem;
            border: 1px solid #ff5704;
            background: #ff5704;
            color: #fff;
            font-size: 1.2rem;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
