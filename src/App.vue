<template>
  <div id="app">
    <div id="nav">
      <!-- tag:渲染的标签 to:路由的路径path-->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <button @click="doClick">Js跳页面</button>|
      <router-link tag="button" to="/head/admin">传参数</router-link>
      <router-link tag="button" to="/my/sub">嵌套试图</router-link>
    </div>
    
    <!--路由出口 渲染视图的地方-->
    <router-view/>
    
  </div>
</template>

<script>
export default {
  methods:{
    doClick(){
      this.$router.push('/head/路遥');//跳转
      //this.$router.go(-1);//后退
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
