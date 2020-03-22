import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import about from '../views/About.vue' 
import userLogin from '../views/userLogin.vue'
import userRegis from '../views/userRegis.vue'
import userShow from '../views/userShow.vue'
import userList from '../views/userList.vue'
import userAction from '../views/userAction.vue'
import manaLogin from '../views/manaLogin.vue'
import manaList from '../views/manaList.vue'
import manaAdd from '../views/manaAdd.vue'
import manaModify from '../views/manaModify.vue'
import index from '../views/index.vue'
import SessionError from '../views/SessionError.vue'
import jQuery from 'jquery' //导入jq
import store from '../store' //导入vuex

Vue.use(VueRouter)

//跨域设置
jQuery.ajaxSetup({
  timeout: 6000,
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true
});

//全局异常处理
jQuery(document).ajaxError(function (ex) {
  console.log(ex);
  alert("服务器正忙....");
});

const routes = [
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/',
    name: 'userLogin',
    component: userLogin
  },
  {
    path: '/userRegis',
    name: 'userRegis',
    component: userRegis
  },
  {
    path: '/manaLogin',
    name: 'manaLogin',
    component: manaLogin
  },
  {
    path: '/index/:num',
    name: 'index',
    component: index,
    children:[
      {
        path: '/userList',
        name: 'userList',
        component: userList
      },
      {
        path: '/userShow',
        name: 'userShow',
        component: userShow
      },
      {
        path: '/userAction',
        name: 'userAction',
        component: userAction
      },
      {
        path: '/manaList',
        name: 'manaList',
        component: manaList
      },
      {
        path: '/manaAdd',
        name: 'manaAdd',
        component: manaAdd
      },
      {
        path: '/manaModify',
        name: 'manaModify',
        component: manaModify
      }
    ]
  },
  {
    path: '/sessionerr',
    name: 'SessionError',
    component: SessionError
  }
]
const router = new VueRouter({
  routes
})
//配置过滤器【守卫】
router.beforeEach((to,from,next)=>{
  //白名单
  if (to.path == "/" || to.path == "/sessionerr" || to.path == "/userRegis") {
    next();//放行
  } else {
    //利用全局缓存
    if(store.getters.getUser){
      next();
    }else{
      next('/sessionerr');
    }
  }
})
export default router



// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/head/:name',
//     name: 'head',
//     component: () => import('../views/Header.vue'),
//     children:[
//       {
//         path: '/my/sub',
//         name: 'sub',
//         component: () => import('../views/sub.vue')
//       },
//     ]
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   },
//   {
//     path: '*',
//     name: 'UiError',
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]