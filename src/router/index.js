import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Footer from '@/components/Foot'
// import Shop from '@/pages/shop/Shop'
// import Me from '@/pages/aboutMe/Me'
// import Cooker from '@/pages/cooker/Cooker'
// import Live from '@/pages/live/Live'
// import ShoppingCar from '@/pages/shoppingCar/ShoppingCar'
console.log(2)
import MyShop from '@/pages/myShop/MyShop'
import AddGoods from '@/pages/myShop/AddGoods'
import GoodsManage from '@/pages/myShop/GoodsManage'

import UserManage from '@/pages/myShop/UserManage'
import ShopSignature from '@/pages/myShop/ShopSignature'
import SendAddress from '@/pages/myShop/SendAddress'
import NewShop from '@/pages/myShop/NewShop'
import OrderManage from '@/pages/myShop/OrderManage'
import BalanceMoney from '@/pages/myShop/BalanceMoney'
import BankCard from '@/pages/myShop/BankCard'
import VerifyPhone from '@/pages/myShop/VerifyPhone'

import Index from '@/pages/login/Index'
import Login from '@/pages/login/Login'
import Register from '@/pages/login/Register'
import ForgotPwd from '@/pages/login/ForgotPwd'

import TakePhoto from '@/pages/takePhoto/TakePhoto'
import ImageClip from '@/pages/takePhoto/ImageClip'


import Test from '@/pages/test/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ImageClip',
      name: 'ImageClip',
      component: ImageClip
    },
    {
      path: '/TakePhoto',
      name: 'TakePhoto',
      component: TakePhoto
    },
    {
      path: '/VerifyPhone',
      name: 'VerifyPhone',
      component: VerifyPhone
    },
    {
      path: '/BalanceMoney',
      name: 'BalanceMoney',
      component: BalanceMoney
    },
    {
      path: '/BankCard',
      name: 'BankCard',
      component: BankCard
    },
    {
      path: '/OrderManage',
      name: 'OrderManage',
      component: OrderManage
    },
    {
      path: '/NewShop',
      name: 'NewShop',
      component: NewShop
    },
    {
      path: '/SendAddress',
      name: 'SendAddress',
      component: SendAddress
    },
    {
      path: '/ShopSignature/:title',
      name: 'ShopSignature',
      component: ShopSignature
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/ForgotPwd',
      name: 'ForgotPwd',
      component: ForgotPwd
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/GoodsManage',
      name: 'GoodsManage',
      component: GoodsManage
    },
    {
      path: '/AddGoods',
      name: 'AddGoods',
      component: AddGoods
    },
    {
      path: '/MyShop',
      name: 'MyShop',
      component: MyShop
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    // {
    //   path: '/footer',
    //   name: 'Footer',
    //   component: Footer
    // },
    // {
    //   path: '/',
    //   name: 'Shop',
    //   component: Shop
    // },
    // {
    //   path: '/Cooker',
    //   name: 'Cooker',
    //   component: Cooker
    // },
    // {
    //   path: '/Live',
    //   name: 'Live',
    //   component: Live
    // },
    // {
    //   path: '/ShoppingCar',
    //   name: 'ShoppingCar',
    //   component: ShoppingCar
    // },
    // {
    //   path: '/Me',
    //   name: 'Me',
    //   component: Me
    // },
  ]
})
