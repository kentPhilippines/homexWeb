import Vue from 'vue';
import VueRouter from 'vue-router';
import {constantRoutes} from './router';
import VueCookie from 'vue-cookie'
import store from '../store'

Vue.use(VueRouter);
Vue.use(VueCookie)
Vue.use(store)

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: constantRoutes
};

export const router = new VueRouter(RouterConfig);

// 路由拦截器
router.beforeEach((to, from, next) => {
  // console.log(VueCookie.get('token'));
  if(VueCookie.get('token')){
//     // let siderMenus = store.state.menu.siderMenus
//     // let currentRoute = siderMenus.filter(route => route.path === to.path)
    next()
//     // if (store.getters.permission_routes.length === 0){

//     //   store.dispatch('GenerateRoutes').then(accessRoutes => {
//     //     router.addRoutes(accessRoutes)
//     //     console.log('to:',to);
//     //     next({ path:to.path, replace: true })
//     //   })


//     // }else{
//     //   // 查询路由菜单
//     //   let masterMenus = store.getters.permission_routes
//     //   let currentRoute = masterMenus.filter(route => route.path === to.path)
//     //   if (currentRoute && currentRoute.length > 0 && currentRoute[0].meta) {
//     //     if (currentRoute[0].meta.masterMenu) {
//     //       next({
//     //         path: currentRoute[0].children[0].path
//     //       })
//     //     } else {
//     //       next()
//     //     }
//     //   }else{
//     //     next()
//     //   }
//     // }

//     // if (currentRoute && currentRoute.length > 0 && currentRoute[0].meta.masterMenu) {
//     //   // 查询一级路由菜单
//     //   next({
//     //     path: currentRoute[0].children[0].path
//     //   })
//     // } else {
//     //   next()
//     // }
  } else {
    if (to.path === '/login') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next()
    } else { // 否则 跳转到登录页面
      next({ path: '/login' })
    }
  }
})
