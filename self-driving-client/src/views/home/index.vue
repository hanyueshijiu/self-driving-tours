<template>
  <div class="container">
    <!-- 旅游路线推荐 -->
    <div class="travelRecommend">
      <div class="title">热门自驾游</div>
      <div class="recommendList">
        <div class="recommendItem">
          <div class="unevenItem">
            <img
              src="https://pic3.zhimg.com/v2-bcf4266b4b219d207ba526c56394f5ca_r.jpg"
              alt=""
            />
            <div class="textBox">
              <div class="recommendTitle">山东青岛 自由行</div>
              <div class="recommendDesc">
                青岛崂山环海公路，位于山东省青岛市崂山区，全长26公里，面向黄海，背靠崂山，绝美的景色让人流连忘返。
              </div>
            </div>
          </div>
        </div>
        <div class="recommendItem">
          <div class="unevenItem">
            <div class="textBox">
              <div class="recommendTitle">山东青岛 自由行</div>
              <div class="recommendDesc">
                青岛崂山环海公路，位于山东省青岛市崂山区，全长26公里，面向黄海，背靠崂山，绝美的景色让人流连忘返。
              </div>
            </div>
            <img
              src="https://pic3.zhimg.com/v2-bcf4266b4b219d207ba526c56394f5ca_r.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="recommendItem">
          <div class="unevenItem">
            <img
              src="https://pic3.zhimg.com/v2-bcf4266b4b219d207ba526c56394f5ca_r.jpg"
              alt=""
            />
            <div class="textBox">
              <div class="recommendTitle">山东青岛 自由行</div>
              <div class="recommendDesc">
                青岛崂山环海公路，位于山东省青岛市崂山区，全长26公里，面向黄海，背靠崂山，绝美的景色让人流连忘返。
                青岛崂山环海公路，位于山东省青岛市崂山区，全长26公里，面向黄海，背靠崂山，绝美的景色让人流连忘返。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 景点推荐 -->
    <div class="sceneryRecommend">
      <div class="title">当季热门景点</div>
      <div class="secneryBox" v-for="(item,index) in 2" :key="index">
        <div class="sceneryImg">
          <img src="https://pic5.40017.cn/03/000/fe/cb/rB5oQFyLGKmAOYB7AAH5tsHOK4M064_540x304_00.jpg" alt="">
        </div>
        <div class="sceneryInfo">
          <div class="sceneryName">
            <span>苏州上方山国家森林公园</span>
            <span class="icon">AAAA景区</span>
          </div>
          <div class="sceneryDesc">“吴越遗迹，江南水乡风光”</div>
          <div class="sceneryOtherInfo">景点地址：<span>江苏省苏州市虎丘区吴越路47号上方山国家森林公园</span></div>
          <div class="sceneryOtherInfo">开放时间：<span>周一至周末 全天 07:30-17:00, 16:30停止入园</span></div>
          <div class="sceneryOtherInfo">景区设施：<span>停车场、免费WIFI、婴儿车租赁、宠物禁止入园、卫生间、园内交通、行李寄存、商店</span></div>
          <div class="more"><a-button type="primary">查看更多</a-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const travelRoad = ref([
  {
    img: "https://pic2.zhimg.com/80/v2-b29235f3d0ef6f978cbdd00c76b8090d_720w.webp",
    jumpUrl: "1",
    id: 0,
  },
  {
    img: "https://pic1.zhimg.com/80/v2-52bbb0d46d5c55c54d8e9066372e5d38_720w.webp",
    jumpUrl: "2",
    id: 1,
  },
  {
    img: "https://pic2.zhimg.com/80/v2-61f77d61553c94f518161f051eafc449_720w.webp",
    jumpUrl: "3",
    id: 2,
  },
]);
</script>

<style lang=less scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .travelRecommend {
    width: 70vw;
    height: 58vh;
    margin: 0 auto 5rem;
    .title {
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      font-size: 2rem;
      border-bottom: 2px solid #03a9f4;
    }
    .recommendList {
      width: 70vw;
      height: calc(58vh - 5rem);
      margin-top: 3rem;
      display: flex;
      justify-content: space-around;
      .recommendItem {
        width: 20vw;
        height: calc(58vh - 8rem);
        display: flex;
        justify-content: space-around;
        border: 1px solid #eee;
        border-radius: 15px;
        img {
          width: 20vw;
          height: 25vh;
          border-radius: 15px;
        }
        .textBox {
          padding: 1rem;
          box-sizing: border-box;
          height: calc(58vh - 22rem);
          .recommendTitle {
            font-size: 1.2rem;
          }
          .recommendDesc {
            margin-top: 1.5rem;
            font-size: .8rem;

          }
        }
      }
    }
  }
  .sceneryRecommend {
    width: 70vw;
    height: 40vh;
    margin: 0 auto;
    .title {
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      font-size: 2rem;
      border-bottom: 2px solid #03a9f4;
    }
    .secneryBox {
      width: 70vw;
      height: 50vh;
      padding: 2rem 2rem;
      box-sizing: border-box;
      display: flex;
      .sceneryImg {
        img {
          width: 30vw;
          height: 30vh;
        }
      }
      .sceneryInfo {
        padding: 1rem;
        box-sizing: border-box;
        .sceneryName {
          font-size: 2rem;
          font-weight: bold;
          .icon {
            font-size: 1rem;
            color: rgb(238, 145, 63);
          }
        }
        .sceneryDesc {
          margin-top: 1rem;
          font-size: 1.2rem;
          color: #03a9f4;
        }
        .sceneryOtherInfo {
          margin-top: 1rem;
          color: #000;
          span {
            color: #03a9f4;
          }
        }
        .more {
          margin-top: 1rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
