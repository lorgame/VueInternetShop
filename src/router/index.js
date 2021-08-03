import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Orders from '@/components/User/Orders'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAdd from '@/components/Ads/NewAdd'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'ad',
    component: Ad,
    beforeEnter: AuthGuard
  },
  {
    path: '/list',
    name: 'adList',
    component: AdList,
    beforeEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'newAdd',
    component: NewAdd,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
