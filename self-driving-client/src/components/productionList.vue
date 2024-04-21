<template>
  <div class="listcontainer">
    <div class="listItem" v-for="(item, index) in props.list" :key="index">
      <!-- 头图 -->
      <img
        :src="item.imgUrl"
        alt=""
      />
      <div class="description">
        <div class="title">
          <span class="name">{{item.sceneryName}}</span>
          <span class="star" v-if="item.star">{{item.star}}景点</span>
        </div>
        <div class="address">
          地址：<span>{{item.address}}</span>
        </div>
        <div class="feature" v-if="item.evaluate">特色：<span>{{item.evaluate}}</span></div>
        <div class="evaluate">
          <span class="score">{{item.score}}</span>/5分
        </div>
      </div>
      <div class="buyBtn">
        <div class="price">￥{{item.price}}</div>
        <div class="btn" @click="goDetail(item.sid)">购买</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  list: Array,
  type: String
});
const router = useRouter();
const goDetail = (sid:string) => {
  router.push({ name: "detail", query: { sid } });
};
</script>

<style lang="less" scoped>
.listcontainer {
  .listItem {
    height: 20vh;
    margin-bottom: 1.5rem;
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    img {
      height: auto;
      width: 15rem;
      border-radius: 10px;
    }
    .buyBtn {
      width: 10rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .price {
        font-size: 1.8rem;
        color: red;
      }
      .btn {
        width: 8rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        background: #03a9f4;
        border-radius: 15px;
        font-size: 1.3rem;
        color: #eee;
        cursor: pointer;
      }
    }
    .description {
      flex: 1;
      padding: 1rem 2rem;
      box-sizing: border-box;
      .title {
        .name {
          font-size: 1.5rem;
          color: #2da1e7;
        }
        .star {
          margin-left: 1rem;
          border: 1px solid #f60;
          border-radius: 5px;
          color: #f60;
          padding: .2rem .5rem;
        }
      }
      .address,
      .feature,
      .evaluate {
        margin-top: 1rem;
        .score {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
