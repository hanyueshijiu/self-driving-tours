<template>
  <div class="container">
    <div class="detailMain">
      <div class="mainInfo">
        <img
          src="https://dimg04.c-ctrip.com/images/1lo1k12000ddck5226264_R_1600_10000.jpg"
          alt=""
        />
        <div class="detailInfo">
          <div class="line">
            <span class="title">拙政园</span><span class="star">5A景区 </span
            ><span class="type">园林古镇</span>
          </div>
          <div class="line">
            <span class="special">“江南园林典范，天下园林之母”</span>
          </div>
          <div class="line">
            景点地址：<span class="text">江苏省苏州市姑苏区东北街178号</span>
          </div>
          <div class="line">
            开放时间：<span class="openTime"
              >周一至周末 全天 07:30-17:30, 17:00停止入园</span
            >
          </div>
          <div class="line">
            景区设施：<span class="text"
              >停车场、免费WIFI、婴儿车租赁、宠物禁止入园、卫生间、行李寄存、手机充电、商店、轮椅租赁</span
            >
          </div>
          <div class="line">建议游玩时间：<span class="text">2~3小时</span></div>
          <div class="buy">
            <div class="price">￥70</div>
            <div class="btn" @click="showDrawer">立即抢购</div>
          </div>
        </div>
      </div>
      <div class="evaluate">
        <h2>游客评论</h2>
        <a-list
          v-if="comments.length"
          :data-source="comments"
          :header="`${comments.length} 条评论`"
          item-layout="horizontal"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-comment
                :author="item.author"
                :avatar="item.avatar"
                :content="item.content"
                :datetime="item.datetime"
              />
            </a-list-item>
          </template>
        </a-list>
        <a-comment>
          <template #avatar>
            <a-avatar
              src="https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="Han Solo"
            />
          </template>
          <template #content>
            <a-form-item>
              <a-textarea v-model:value="commentValue" :rows="4" />
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit"
              >
                提交评论
              </a-button>
            </a-form-item>
          </template>
        </a-comment>
      </div>
    </div>
    <a-drawer
      v-model:open="open"
      title="拙政园购票"
      width="50vw"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <h4>请填写出游人信息</h4>

      <a-form
        ref="formRef"
        name="dynamic_form_nest_item"
        :model="dynamicValidateForm"
        @finish="onFinish"
      >
        <a-space
          v-for="(user, index) in dynamicValidateForm.users"
          :key="user.id"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
        >
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

      <template #footer>
        <a-button style="margin-right: 8px" @click="onClose">取消 </a-button>
        <a-button type="primary" @click="submitForm">立即支付</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, watchEffect } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
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
  console.log("Received values of form:", values);
  console.log("dynamicValidateForm.users:", dynamicValidateForm.users);
};

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

const submitForm = () => {
  if (dynamicValidateForm.users.length <= 1 && !dynamicValidateForm.users[0].name) {
    message.info("至少需要一个出游人信息！");
    return;
  }
  console.log(dynamicValidateForm.users, " 出游人列表");
  message.success({
    content: () => "购票成功！",
    style: {
      marginTop: "20vh",
    },
  });
  onClose();
};

// 评论列表
const comments = ref<Comment[]>([
  {
    author: "游客1",
    avatar:
      "https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    content: "景色可以，就是假日人太多了 o(╥﹏╥)o",
    datetime: "几天前",
  },
  {
    author: "游客2",
    avatar:
      "https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    content: "对于学园林景观设计的还行，对路人在没有讲解的情况下就是走马观花",
    datetime: "几天前",
  },
  {
    author: "游客3",
    avatar:
      "https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    content: "进园方便，园内景色宜人，很漂亮，体验了一下江南园林的秀美！",
    datetime: "几天前",
  },
]);
const submitting = ref<boolean>(false);
const commentValue = ref<string>("");

// 提交 评论
const handleSubmit = () => {
  if (!commentValue.value) {
    return;
  }

  submitting.value = true;

  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: "寒月十九",
        avatar:
          "https://ts1.cn.mm.bing.net/th?id=OIP-C.D34PjxR7ud-vxeTDvs5Z8gAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        content: commentValue.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    commentValue.value = "";
  }, 1000);
};

watchEffect(() => {
  const params = route.query;
  console.log("路由参数变化:", params);
});
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
        border: 1px solid #ccc; /* 为了可视化边界 */
        word-wrap: break-word; /* 允许单词在达到边界时断行 */
        overflow-wrap: break-word; /* 确保在单词无法完整放入容器时能断行 */
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
