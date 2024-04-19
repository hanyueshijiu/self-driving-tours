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
            <span class="title">拙政园</span><span class="star">AAAAA景区</span>
          </div>
          <div class="line">
            <span class="special">“江南园林典范，天下园林之母”</span
            ><span class="type">园林古镇</span>
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
            <div class="price">￥30</div>
            <div class="btn">立即抢购</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
const route = useRoute();

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
            padding: .2rem;
            border: 1px solid #eee;
            background: #eee;
            border-radius: 5px;
          }
          .text {
            color: #03a9f4;
          }
        }
      }
    }
  }
}
</style>
