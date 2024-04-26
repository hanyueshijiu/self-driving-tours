<template>
  <div class="container">
    <div class="hotelModule">
      <div class="header">
        <div class="searchBox">
          <!-- 目的地&关键词 -->
          <div class="box1">
            <div class="location">
              <p>目的地：</p>
              <a-select
                v-model="cityValue"
                show-search
                style="width: 200px"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
            </div>
            <div class="keyword">
              <p>关键词：</p>
              <a-input v-model="keywordValue" placeholder="品牌/酒店" />
            </div>
          </div>
          <!-- 时间 -->
          <div class="box2">
            <p>入住</p>
            <a-range-picker v-model="time" />
            <p>退房</p>
          </div>
          <!-- 搜索按钮 -->
          <div class="box3">
            <div class="btn">搜索酒店</div>
          </div>
        </div>
        <div class="recommendImg">
          <img
            src="https://pic5.40017.cn/i/ori/1mvA1zdaEgw.png"
            alt=""
          />
        </div>
      </div>
      <div class="recommend">
        <div class="title">为你推荐</div>
        <div class="list">
          <div class="item" v-for="(item,index) in 3" :key="index"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SelectProps } from "ant-design-vue";
import { ref } from "vue";
import type { Dayjs } from "dayjs";
type RangeValue = [Dayjs, Dayjs];

const options = ref<SelectProps["options"]>([
  { value: "beijing", label: "北京" },
  { value: "shanghai", label: "上海" },
  { value: "guangzhou", label: "广州" },
  { value: "shenzhen", label: "深圳" },
  { value: "chengdu", label: "成都" },
  { value: "hangzhou", label: "杭州" },
  { value: "chongqing", label: "重庆" },
  { value: "wuhan", label: "武汉" },
  { value: "xi'an", label: "西安" },
  { value: "suzhou", label: "苏州" },
  { value: "nanjing", label: "南京" },
  { value: "changsha", label: "长沙" },
  { value: "qingdao", label: "青岛" },
  { value: "shenyang", label: "沈阳" },
  { value: "dalian", label: "大连" },
  { value: "kunming", label: "昆明" },
  { value: "xiamen", label: "厦门" },
  { value: "tianjin", label: "天津" },
  { value: "ningbo", label: "宁波" },
  { value: "guiyang", label: "贵阳" },
  { value: "zhengzhou", label: "郑州" },
  { value: "harbin", label: "哈尔滨" },
  { value: "jinan", label: "济南" },
  { value: "fuzhou", label: "福州" },
  { value: "hongkong", label: "香港" },
  { value: "macau", label: "澳门" },
  { value: "lanzhou", label: "兰州" },
  { value: "sanya", label: "三亚" },
  { value: "haikou", label: "海口" },
  { value: "urumqi", label: "乌鲁木齐" },
]);

const cityValue = ref<string | undefined>("苏州");

const keywordValue = ref<string>("");

const time = ref<RangeValue>();

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<style lang=less scoped>
.container {
  padding: 3rem 10rem;
  box-sizing: border-box;
  .hotelModule {
    width: 70vw;
    margin: 0 auto 3rem;
    height: 80vh;
    .header {
      padding: 0 5rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .searchBox {
        width: 42rem;
        height: 15rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        .box1 {
          display: flex;
          .location {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0.4rem 0.8rem;
          }
          .keyword {
            flex: 1;
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0.4rem 0.8rem;
            p {
              width: 3rem;
              white-space: nowrap;
              margin-right: 1rem;
            }
          }
        }
        .box2 {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.4rem 0.8rem;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 5px;
          .ant-picker {
            width: 30rem;
          }
          p {
            padding: 0 1rem;
          }
        }
        .box3 {
          height: 6rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .btn {
            width: 15rem;
            height: 3rem;
            line-height: 3rem;
            border: 1px solid #ccc;
            font-size: 1.2rem;
            text-align: center;
            border-radius: 25px;
          }
        }
      }
      .recommendImg {
        width: 30rem;
        height: 15rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        img {
          width: 100%; /* 设置图片宽度为容器宽度 */
          height: 100%; /* 设置图片高度为容器高度 */
          object-fit: cover; /* 保持图片宽高比，放大并裁剪以填充容器 */
          object-position: 67%; /* 确保图片的中心与容器的中心对齐 */
          border-radius: 5px;
        }
      }
    }
    .recommend {
      padding: 1rem 5rem;
      .title {
        font-size: 1.2rem;
        font-weight: bold;
        padding: 2rem;
      }
      .list {
        display: flex;
        flex-wrap: wrap; /* 允许子项换行 */
        justify-content: center; /* 子项左对齐，可以根据需要调整 */
        gap: 20px; /* 子项之间的间距 */
        .item {
          flex: 0 0 calc(33% - 20px); /* 每个子项占行宽的25%，减去间距 */
          height: 20rem; /* 高度，可以根据实际需要调整 */
          background-color: #fff; /* 背景色 */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
            /* 主阴影 */ 0 6px 20px rgba(0, 0, 0, 0.19); /* 深层阴影，增加立体感 */
          padding: 10px; /* 内部间距 */
          border-radius: 5px;
          box-sizing: border-box; /* 包括padding和border在内的宽高计算方式 */
        }
      }
    }
  }
}
</style>
