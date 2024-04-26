<template>
  <!-- 景区 -->
  <div class="listcontainer" v-if="$props.type === 'scenery'">
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
  <!-- 酒店 -->
  <div class="hotelList" v-if="props.type === 'hotel'">
    <div class="sortModule">
      <div class="starLevel">
        <span class="title">星级</span>
        <sapn class="selectItem" v-for="item in priceFilterArr" :key="item.value">{{ item.name }}</sapn>
      </div>
      <div class="priceLevel">
        <span class="title">价格</span>
        <sapn class="selectItem" v-for="item in starFilterArr" :key="item.value">{{ item.name }}</sapn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps, PropType } from "vue";
const router = useRouter();
interface List {
  sceneryName: string;
  star: string;
  address: string;
  evaluate: string;
  score: string;
  price: string;
  sid: string;
  imgUrl: string;
};

interface FilterType {
  name: string;
  value: number;
};

// 酒店价格筛选
const priceFilterArr: FilterType[] = [
  {
    name: '不限',
    value: 0
  },
  {
    name: '100元以内',
    value: 1
  },
  {
    name: '100-300元',
    value: 2
  },
  {
    name: '300-600元',
    value: 3
  },
  {
    name: '600-1500元',
    value: 4
  },
  {
    name: '1500元以上',
    value: 5
  }
];

// 酒店星级筛选
const starFilterArr: FilterType[] = [
  {
    name: '不限',
    value: 0
  },
  {
    name: '经济',
    value: 1
  },
  {
    name: '三星/舒适',
    value: 2
  },
  {
    name: '四星/高档',
    value: 3
  },
  {
    name: '五星/豪华',
    value: 4
  },
  {
    name: '民宿',
    value: 5
  }
];

const props = defineProps({
  list: {
    type: Array as PropType<List[]>,
    require: true
  },
  type: String
});

// 跳转详情页
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
.hotelList {
  .sortModule {
    background-color: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: .5rem .8rem;
    box-sizing: border-box;
    .starLevel, .priceLevel {
      display: flex;
      height: 3rem;
      align-items: center;
      border-bottom: 2px solid #eee;
      .title {
        color: #03a9f4;
      }
      .selectItem {
        padding: .2rem .4rem;
        margin-left: 1.5rem;
      }
      .selectItem:hover {
        border-radius: 5px;
        background: #eee;
      }
    }
  }
}
</style>
