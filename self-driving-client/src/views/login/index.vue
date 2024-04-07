<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <div class="title">
        <h1>自驾游旅游网</h1>
      </div>
      <div class="iconBox" @click="goHome"><HomeFilled />首页</div>
    </div>
    <div class="box">
      <div class="image"></div>
      <!--  -->
      <div class="form">
        <div class="modelTitle">{{model === 'login' ? '登录' : '注册'}}</div>
        <div class="main" v-if="model === 'login'">
          <div class="inpbox">
            <input type="text" placeholder="请输入手机号" />
          </div>
          <div class="inpbox">
            <input type="password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="main" v-else>
          <div class="inpbox mt2">
            <input type="text" placeholder="请输入手机号" />
          </div>
          <div class="inpbox mt2">
            <input type="password" placeholder="请输入密码" />
          </div>
          <div class="inpbox mt2">
            <input type="password" placeholder="请再次输入密码" />
          </div>
        </div>
        <div :class="['action', model === 'register' ? 'mt2' : '']">
          <div class="btn">{{model === 'login' ? '登录' : '注册'}}</div>
        </div>
        <div class="tips" @click="changeModel">
          <p>{{model === 'login' ? '没有账号？立即注册' : '已有账号，立即登录'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { HomeFilled } from "@ant-design/icons-vue";
import { ref } from 'vue';
const router = useRouter();
// 页面类型 登录 || 注册
type AuthAction = 'login' | 'register';
const model = ref<AuthAction>('login');


// 跳转首页
const goHome = () => {
  router.replace('/');
}
// 切换模式
const changeModel = () => {
  model.value = model.value === 'login' ? 'register' : 'login';
}

</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url(https://ts1.cn.mm.bing.net/th/id/R-C.707934369ccf01ec4d93e95264333fa3?rik=UZti7qCa0H87NQ&riu=http%3a%2f%2fimg.pptjia.com%2fimage%2f20180609%2fa390d7d23c6dc9ca62fdf56189df3471.jpg&ehk=TEBCbJ6oWc3A7PiyF%2fJR0fokK%2fwrJQLgSFGlBvqhIOs%3d&risl=&pid=ImgRaw&r=0);
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  .header {
    display: flex;
    padding: 0 20vw;
    height: 10rem;
    font-size: 2rem;
    align-items: center;
    justify-content: space-between;
    .title {
      h1 {
        background: linear-gradient(to right, #fff, #03a9f4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .iconBox {
      cursor: pointer;
      color: #00f;
    }
  }
  .box {
    display: flex;
    justify-content: center;
    .image {
      width: 25em;
      height: 30rem;
      background-image: url(https://tse2-mm.cn.bing.net/th/id/OIP-C.YKacydMFQxadXqu2xdXTmgHaLJ?rs=1&pid=ImgDetMain);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .form {
      width: 25rem;
      height: 23rem;
      background-color: rgba(205, 234, 247, 0.3);
      color: #fff;
      padding: 2rem 2rem 5rem;
      border-radius: 1rem;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
      .modelTitle {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
      }
      .main {
        .inpbox {
          background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
          background-size: 400%;
          width: 100%;
          height: 3rem;
          margin-top: 3rem;
          border-radius: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 1s;
          input {
            background-color: rgb(205, 234, 247);
            border: 0;
            width: 100%;
            text-align: center;
            font-size: 1rem;
            color: #fff;
            outline: none;
            height: calc(100% - 0.3rem);
            width: calc(100% - 0.4rem);
            border-radius: 2rem;
          }
        }
        .mt2 {
          margin-top: 2rem;
        }
        .inpbox:has(input:focus) {
          animation: animate 5s linear infinite;
          transform: scale(1.2);
        }
        @keyframes animate {
          0% {
            background-position: 0, 0;
          }
          100% {
            background-position: 400% 0;
          }
        }
      }
      .action {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        .btn {
          width: 100%;
          text-transform: uppercase;
          border: 2px solid #0e92b3;
          background: rgb(147, 214, 226);
          color: #eee;
          text-align: center;
          line-height: 3rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: all 1s;
        }
        .btn:hover {
          transform: scale(1.2);
          background-color: #0e92b3;
        }
      }
      .mt2 {
        margin-top: 2rem;
      }
      .tips {
        margin-top: 2rem;
        text-align: right;
        cursor: pointer;
      }
    }
  }
}
</style>
