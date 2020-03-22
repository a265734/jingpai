import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[persistedState()],
  //获得值
  getters:{
    getUser(state){
      return state.user;
    },
    getShop(state){
      return state.shop;
    }
  },
  //存放全局响应数据
  state: {
    //属性
    user:null,
    shop:null,
  },
  //同步设置值
  mutations: {
    setUser(state,val){
      state.user=val;
    },
    setShop(state,val){
      state.shop=val;
    }
  },
  //异步处理
  actions: {
  },
  modules: {
  }
})
