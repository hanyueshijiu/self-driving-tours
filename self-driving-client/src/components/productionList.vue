<template>
  <div class="listcontainer">
    <div class="listItem" v-for="(item, index) in 20" :key="index">
      <!-- 头图 -->
      <img
        src="https://img.alicdn.com/imgextra/i3/6000000005257/O1CN01QoKeYn1ohl3iBkbKY_!!6000000005257-0-hotel.jpg_200x200xz"
        alt=""
      />
      <div class="description">
        <div class="title">
          <span class="name">尚湖风景区</span>
          <span class="star">5A景点</span>
        </div>
        <div class="address">地址：<span>江苏省苏州市常熟市虞山镇外西三环路尚湖景区</span></div>
        <div class="feature">特色：<span>一叶扁舟、四季花景、飞鸟过林</span></div>
        <div class="evaluate"><span class="score">4.5</span>/5分<span class="level">非常好</span></div>
      </div>
      <div class="buyBtn">
        <div class="price">￥100</div>
        <div class="btn">购买</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.listcontainer {
  .listItem {
    height: 20vh;
    margin-bottom: 1.5rem;
    display: flex;
    border-bottom: 1px solid #ccc;
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
        }
      }
      .address, .feature, .evaluate {
        margin-top: 1rem;
        .score {
          font-weight: bold;
        }
        .level {
          margin-left: 1rem;
          color: #f60;
        }
      }
    }
  }
}
</style>
