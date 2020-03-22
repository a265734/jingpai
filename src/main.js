import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Main from './AppMain.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import jQuery from 'jquery'


Vue.config.productionTip = false

Vue.use(ElementUI)//使用ElementUI

Vue.prototype.$jq=jQuery//注册vue原生属性

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
new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount('#app')
