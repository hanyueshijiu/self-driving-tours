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
    meta: {title: '自驾游平台'},
    children: [
      {
        path: '/selfDriving/home',
        name: 'home',
        component: Home
      },
      {
        path: '/selfDriving/road',
        name: 'road',
        component: () => import('../views/road/index.vue')
      },
      {
        path: '/selfDriving/scenery',
        name: 'scenery',
        component: () => import('../views/scenery/index.vue')
      },
      {
        path: '/selfDriving/hotel',
        name: 'hotel',
        component: () => import('../views/hotel/index.vue')
      },
      {
        path: '/selfDriving/evaluate',
        name: 'evaluate',
        component: () => import('../views/evaluate/index.vue')
      },
      {
        path: '/selfDriving/search',
        name: 'search',
        component: () => import('../views/search/index.vue')
      },
      {
        path: '/selfDriving/detail',
        name: 'detail',
        component: () => import('../views/detail/index.vue')
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
    meta: {title: "登录" }
  },{
    path: "/message",
    name: "message",
    component: () => import("../views/message/index.vue"),
    meta: {title: "个人资料" }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order/index.vue')
  },
  {
    path: '/',
    name: 'root',
    redirect: '/selfDriving',
    meta: {title: 'Root'}
  },
  ...accessRoutes,
]

export default constantRoutes  // 默认抛出