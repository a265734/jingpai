<template>
<div class="wrap">
<!-- main begin-->
 <div class="main">
   <div class="sidebarg fnone">
    
    <div class="login">
      <dl>
        <dt>管理员登陆</dt>
        <dd><label for="name">用户名：</label><input type="text" class="inputh" value="常用邮箱" v-model="name" id="name"/></dd>
        <dd><label for="password">密 码：</label><input type="text" class="inputh" value="密码" v-model="password" id="password"/></dd>
        <dd>
           <label class="lf" for="passwords">验证码：</label>
           <input type="text" class="inputh inputs lf" value="验证码" id="passwords"/>
           <span class="wordp lf"><img src="images/img2.jpg" width="96" height="27" alt="" /></span>
           <span class="lf"><a href="" title="">看不清</a></span>
        </dd>
        <dd>
           <input name=""  type="checkbox" id="rem_u"  />
           <span for="rem_u">下次自动登录</span>
        </dd>
        <dd class="buttom">
           <input name="" type="submit" value="登 录" @click="doLogin" class="spbg buttombg buttomb f14 lf" />
           <input name="" type="submit" value="注 册" class="spbg buttombg buttomb f14 lf" />
           <span class="blues  lf"><a href="" title="">忘记密码?</a></span>
           <div class="cl"></div>
        </dd>
       
      </dl>
    </div>
   </div>
  <div class="cl"></div>
 </div>
<!-- main end-->
 
<!-- footer begin-->
</div>
</template>

<script>
export default {
data() {
//这里存放数据
return {
    name:"",
    password:"",
};
},
//计算属性
computed: {},
//方法集合
methods: {
    doLogin(){
        if(this.name=="" || this.password==""){
            alert("请输入用户名密码");
            return
        }else if(this.name=="admin" && this.password=="123"){
            this.$router.push('/index/1');
        }else{
            alert("用户名或密码错误")
        }
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
@import url('../assets/css/common.css');
@import url('../assets/css/style.css');
</style>