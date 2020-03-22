<template>
<div class=''>
  <span>用户信息:{{this.$store.getters.getUser.userName}}</span>
  <button @click="changeVal">改变信息</button>
</div>
</template>

<script>
export default {
data() {
//这里存放数据
return {

};
},
//计算属性
computed: {},
//方法集合
methods: {
  changeVal(){
    this.$store.commit('setUser',{userName:"路遥",userPwd:"123"});
  }
},
//挂载完成（可以访问DOM元素）
mounted() {

},
//监控data中的数据变化
watch: {

}
}
</script>
<style  scoped>
/*@import url(); 引入公共css类*/

</style>
