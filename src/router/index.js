import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Register = () => import('@/views/profile/Register')
const Login = () => import('@/views/profile/Login')
const Shopcart = () => import('@/views/shopcart/Shopcart')
const createOrder  = () => import('@/views/profile/xiaji/createorder')
const collect  = () => import('@/views/profile/xiaji/collect')
const order  = () => import('@/views/profile/xiaji/order')
const setting  = () => import('@/views/profile/xiaji/setting')
const address  = () => import('@/views/profile/xiaji/Address')
const about  = () => import('@/views/profile/xiaji/about')
const addressEdit  = () => import('@/views/profile/xiaji/addressedit')
const orderDetail  = () => import('@/views/profile/xiaji/orderDetail')

import { Notify, Toast } from 'vant';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name:'Home',
    component: Home,
    meta:{
      title: "首页"
    },
  },
  {
    path: '/category',
    name:'Category',
    component: Category,
    meta:{
      title: "购物车",
      isAuth: true
    },
  },
  {
    path: '/cart',
    name:'Cart',
    component: Cart,
    meta:{
      title: "商品分类"
    },
  },
  {
    path: '/profile',
    name:'Profile',
    component: Profile,
    meta:{
      title: "个人中心",
      isAuth: true
    },
  },
  {
    path: '/createorder',
    name:'createOrder',
    component: createOrder,
    meta:{
      title: "生成订单",
      isAuth: true
    },
  },
  {
    path: '/orderdetail',
    name:'orderDetail',
    component: orderDetail,
    meta:{
      title: "订单详情",
      isAuth: true
    },
  },
  {
    path: '/addressedit',
    name:'addressEdit',
    component: addressEdit,
    meta:{
      title: "新增地址",
      isAuth: true
    },
  },
  {
    path: '/collect',
    name:'collect',
    component: collect,
    meta:{
      title: "我的收藏",
      isAuth: true
    },
  },
  {
    path: '/order',
    name:'order',
    component: order,
    meta:{
      title: "我的订单",
      isAuth: true
    },
  },
  {
    path: '/setting',
    name:'setting',
    component: setting,
    meta:{
      title: "账号管理",
      isAuth: true
    },
  },
  {
    path: '/address',
    name:'address',
    component: address,
    meta:{
      title: "地址管理",
      isAuth: true
    },
  },
  {
    path: '/about',
    name:'about',
    component: about,
    meta:{
      title: "关于我们",
      isAuth: true
    },
  },
  {
    path: '/register',
    name:'Register',
    component: Register,
    meta:{
      title: "用户注册"
    },
  },
  {
    path: '/login',
    name:'Login',
    component: Login,
    meta:{
      title: "用户登录"
    },
  },
  {
    path: '/shopcart',
    name:'Shopcart',
    component: Shopcart,
    meta:{
      title: "商品详情"
    },
  }
];

const router = new VueRouter({
  mode: "history",
  base: '/',
  routes,
});

router.beforeEach((to, from, next)=>{ 
  if (to.meta.isAuth && store.state.user.isLogin === false) {
    Notify('您还没有登录,请先登录')
    return next('/login')
  }else {
    next()
  }

  document.title = to.matched[0].meta.title
})

export default router;
