import { RouteRecordRaw } from "vue-router";
const Layout = () => import('../layout/Layout.vue');
const Home = () => import('../views/home/index.vue');
// 实际的主要的路由
export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/selfDriving',
    name: 'selfDriving',
    redirect: '/selfDriving/home',
    component: Layout,
    meta: { title: '自驾游平台' },
    children: [
      {
        // 首页
        path: '/selfDriving/home',
        name: 'home',
        component: Home
      },
      {
        // 路线规划
        path: '/selfDriving/road',
        name: 'road',
        component: () => import('../views/road/index.vue')
      },
      {
        // 景点门票
        path: '/selfDriving/scenery',
        name: 'scenery',
        component: () => import('../views/scenery/index.vue')
      },
      {
        // 酒店民宿
        path: '/selfDriving/hotel',
        name: 'hotel',
        component: () => import('../views/hotel/index.vue')
      },
      {
        // 待定
        path: '/selfDriving/evaluate',
        name: 'evaluate',
        component: () => import('../views/evaluate/index.vue')
      },
      {
        // 搜索
        path: '/selfDriving/search',
        name: 'search',
        component: () => import('../views/search/index.vue')
      },
      {
        // 景区&酒店详情页
        path: '/selfDriving/detail',
        name: 'detail',
        component: () => import('../views/detail/index.vue')
      },
      {
        // 发布旅游攻略
        path: '/selfDriving/uploadStrategy',
        name: 'uploadStrategy',
        component: () => import('../views/strategy/index.vue')
      },
      {
        // 笔记详情页
        path: '/selfDriving/note',
        name: 'note',
        component: () => import('../views/note/index.vue')
      },
    ]
  }
]

const Login = import("../views/login/index.vue");
// 与项目实际不太相关的路由以及重定向
const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => Login,
    meta: { title: "登录" }
  }, {
    path: "/message",
    name: "message",
    component: () => import("../views/message/index.vue"),
    meta: { title: "个人资料" }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order/index.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/manage/index.vue')
  },
  {
    path: '/',
    name: 'root',
    redirect: '/selfDriving',
    meta: { title: 'Root' }
  },
  ...accessRoutes,
]

export default constantRoutes  // 默认抛出